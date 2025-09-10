import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "@/types/FormTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleImageUpload from "@/components/MultipleImageUploadSection";
import { flatBottomSideSchema } from "@/validationSchema/diver/flatBottomSchema";

interface Props {
    data: FormData["flatBottom"];
    onChange: (data: FormData["flatBottom"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const FlatBottomForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const paintOptions = [
        { id: 1, label: "Leeching", value: "leeching" },
        { id: 2, label: "Blistering", value: "blistering" },
        { id: 3, label: "Cracking", value: "cracking" },
        { id: 4, label: "Abrasion/Scraping", value: "abrasion/scraping" },
        { id: 5, label: "Exposed Bare Metal", value: "exposed bare metal" },
        { id: 6, label: "Grounding Damage", value: "grounding damage" },
    ];

    const growthOptions = [
        { id: 1, label: "Acorn Barnacles", value: "acorn barnacles" },
        { id: 2, label: "Goose Barnacles", value: "goose barnacles" },
        { id: 3, label: "Algae", value: "algae" },
        { id: 4, label: "Slime", value: "slime" },
        { id: 5, label: "Sea Weeds", value: "sea weeds" },
        { id: 6, label: "Tubeworm Casts", value: "tubeworm casts" },
        { id: 7, label: "Mussles", value: "mussles" },
        { id: 8, label: "Marine Grass", value: "marine grass" },
        { id: 9, label: "Calcium Deposits", value: "calcium deposits" },
        { id: 10, label: "Nil", value: "nil" },
    ];

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const validateForm = (formData: FormData['flatBottom']) => {
        const result = flatBottomSideSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as string;
                fieldErrors[path] = issue.message;
            });
            setErrors(fieldErrors);
            onValidationChange?.(false, fieldErrors);
        } else {
            setErrors({});
            onValidationChange?.(true, {});
        }
    };

    const handleChange = (field: keyof FormData['flatBottom'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
    };


    return (
        <div className="space-y-6 pb-4">
            {/* Port Side Area of the Bow Looking Fwd Before/After Cleaning Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultipleImageUpload
                    id="flatBottomSideNearToTheFwdAreaBeforeCleaning"
                    label="Flat bottom side area of the bow looking fwd before cleaning"
                    images={data.flatBottomSideNearToTheFwdAreaBeforeCleaning || []}
                    onImagesChange={(images) => handleChange('flatBottomSideNearToTheFwdAreaBeforeCleaning', images)}
                    maxImages={10}
                />

                <MultipleImageUpload
                    id="flatBottomSideNearToTheFwdAreaAfterCleaning"
                    label="Flat bottom side area of the bow looking fwd after cleaning"
                    images={data.flatBottomSideNearToTheFwdAreaAfterCleaning || []}
                    onImagesChange={(images) => handleChange('flatBottomSideNearToTheFwdAreaAfterCleaning', images)}
                    maxImages={10}
                />
            </div>

            {/* Port Side Area Near to Mid Area Before/After Cleaning Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultipleImageUpload
                    id="flatBottomSideNearToTheMidAreaBeforeCleaning"
                    label="Flat bottom side near to the mid area before cleaning"
                    images={data.flatBottomSideNearToTheMidAreaBeforeCleaning || []}
                    onImagesChange={(images) => handleChange('flatBottomSideNearToTheMidAreaBeforeCleaning', images)}
                    maxImages={10}
                />

                <MultipleImageUpload
                    id="flatBottomSideNearToTheMidAreaAfterCleaning"
                    label="Flat bottom side near to the mid area after cleaning"
                    images={data.flatBottomSideNearToTheMidAreaAfterCleaning || []}
                    onImagesChange={(images) => handleChange('flatBottomSideNearToTheMidAreaAfterCleaning', images)}
                    maxImages={10}
                />
            </div>

            {/* Port Side Area Near to Aft Area Before/After Cleaning Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultipleImageUpload
                    id="flatBottomSideNearToTheAftAreaBeforeCleaning"
                    label="Flat bottom side near to the aft area before cleaning"
                    images={data.flatBottomSideNearToTheAftAreaBeforeCleaning || []}
                    onImagesChange={(images) => handleChange('flatBottomSideNearToTheAftAreaBeforeCleaning', images)}
                    maxImages={10}
                />

                <MultipleImageUpload
                    id="flatBottomSideNearToTheAftAreaAfterCleaning"
                    label="Flat bottom side near to the aft area after cleaning"
                    images={data.flatBottomSideNearToTheAftAreaAfterCleaning || []}
                    onImagesChange={(images) => handleChange('flatBottomSideNearToTheAftAreaAfterCleaning', images)}
                    maxImages={10}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="paintCondition">Paint Condition</Label>
                    <Select value={data.paintCondition} onValueChange={(value) => handleChange('paintCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Paint Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Paint Deterioration</Label>
                    <div className="mt-2 space-y-2">
                        {paintOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.paintDeterioration?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("paintDeterioration", [
                                                ...(data.paintDeterioration || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "paintDeterioration",
                                                (data.paintDeterioration || []).filter((val) => val !== item.value)
                                            );
                                        }
                                    }}
                                />
                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="areaAffected">Area Affected (%)</Label>
                    <Input
                        id="areaAffected"
                        value={data.areaAffected || ""}
                        onChange={(e) => handleChange('areaAffected', e.target.value)}
                        placeholder="Enter area affected"
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label>Growth Type <span className="text-red-500">*</span></Label>
                    <div className="mt-2 space-y-2">
                        {growthOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.growthType?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("growthType", [
                                                ...(data.growthType || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "growthType",
                                                (data.growthType || []).filter((val) => val !== item.value)
                                            );
                                        }
                                    }}
                                />
                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                        {errors.growthType && <p className="text-sm text-red-600 mt-1">{errors.growthType}</p>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="thickness">Thickness (mm)</Label>
                    <Input
                        id="thickness"
                        value={data.thickness || ""}
                        onChange={(e) => handleChange('thickness', e.target.value)}
                        placeholder="Enter thickness"
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="coverage">Coverage (%)</Label>
                    <Input
                        id="coverage"
                        value={data.coverage || ""}
                        onChange={(e) => handleChange('coverage', e.target.value)}
                        placeholder="Enter coverage"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="severity">Severity</Label>
                    <Select value={data.severity} onValueChange={(value) => handleChange('severity', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="light">Light</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="scattered">Scattered</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="moderate">Moderate</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="heavy">Heavy</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="noRemarks">No Remarks</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="shellPlateCondition">Shell Plate Condition <span className="text-red-500">*</span></Label>
                    <Select value={data.shellPlateCondition} onValueChange={(value) => handleChange('shellPlateCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Shell Plate Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.shellPlateCondition && <p className="text-sm text-red-600 mt-1">{errors.shellPlateCondition}</p>}
                </div>

                <div>
                    <Label htmlFor="weldSeamCondition">Weld Seam Condition <span className="text-red-500">*</span></Label>
                    <Select value={data.weldSeamCondition} onValueChange={(value) => handleChange('weldSeamCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Weld Seam Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.weldSeamCondition && <p className="text-sm text-red-600 mt-1">{errors.weldSeamCondition}</p>}
                </div>

                <div>
                    <Label htmlFor="corrosion">Corrosion <span className="text-red-500">*</span></Label>
                    <Select value={data.corrosion} onValueChange={(value) => handleChange('corrosion', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Corrosion" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.corrosion && <p className="text-sm text-red-600 mt-1">{errors.corrosion}</p>}
                </div>

                {/* Conditional corrosion fields */}
                {data.corrosion === "yes" && (
                    <>
                        <div>
                            <Label htmlFor="corrosionSeverity">Corrosion Severity <span className="text-red-500">*</span></Label>
                            <Select value={data.corrosionSeverity} onValueChange={(value) => handleChange('corrosionSeverity', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select Corrosion Severity" />
                                </SelectTrigger>
                                <SelectContent className="z-50 bg-white shadow-md" position="popper">
                                    <SelectItem className="hover:bg-gray-100 cursor-pointer" value="light">Light</SelectItem>
                                    <SelectItem className="hover:bg-gray-100 cursor-pointer" value="moderate">Moderate</SelectItem>
                                    <SelectItem className="hover:bg-gray-100 cursor-pointer" value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.corrosionSeverity && <p className="text-sm text-red-600 mt-1">{errors.corrosionSeverity}</p>}
                        </div>

                        <div>
                            <Label htmlFor="corrosionAreaAndDescription">Corrosion Area & Description</Label>
                            <Input
                                id="corrosionAreaAndDescription"
                                value={data.corrosionAreaAndDescription || ""}
                                onChange={(e) => handleChange('corrosionAreaAndDescription', e.target.value)}
                                placeholder="Enter corrosion area and description"
                                className="mt-1"
                            />
                        </div>
                    </>
                )}

                <div>
                    <Label htmlFor="mechanicalDamage">Mechanical Damage <span className="text-red-500">*</span></Label>
                    <Select value={data.mechanicalDamage} onValueChange={(value) => handleChange('mechanicalDamage', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Mechanical Damage" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.mechanicalDamage && <p className="text-sm text-red-600 mt-1">{errors.mechanicalDamage}</p>}
                </div>

                <div>
                    <Label htmlFor="groundingDamage">Grounding Damage <span className="text-red-500">*</span></Label>
                    <Select value={data.groundingDamage} onValueChange={(value) => handleChange('groundingDamage', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Grounding Damage" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.groundingDamage && <p className="text-sm text-red-600 mt-1">{errors.groundingDamage}</p>}
                </div>

                <div>
                    <Label htmlFor="plateIndentations">Plate Indentations <span className="text-red-500">*</span></Label>
                    <Select value={data.plateIndentations} onValueChange={(value) => handleChange('plateIndentations', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Plate Indentations" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.plateIndentations && <p className="text-sm text-red-600 mt-1">{errors.plateIndentations}</p>}
                </div>

                <div>
                    <Label htmlFor="drainPlugs">Drain Plugs</Label>
                    <Select value={data.drainPlugs} onValueChange={(value) => handleChange('drainPlugs', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Drain Plugs" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="navigationalAids">Navigational Aids</Label>
                    <Select value={data.navigationalAids} onValueChange={(value) => handleChange('navigationalAids', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Navigational Aids" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="intact">Intact</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="missing">Missing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="dryDockMarksPresent">Dry Dock Marks Present</Label>
                    <Select value={data.dryDockMarksPresent} onValueChange={(value) => handleChange('dryDockMarksPresent', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Dry Dock Marks Present" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="dryDockMarksFouled">Dry Dock Mark Fouled</Label>
                    <Select value={data.dryDockMarksFouled} onValueChange={(value) => handleChange('dryDockMarksFouled', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Dry Dock Marks Fouled" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="dryDockMarksPainted">Dry Dock Mark Painted</Label>
                    <Select value={data.dryDockMarksPainted} onValueChange={(value) => handleChange('dryDockMarksPainted', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Dry Dock Marks Painted" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="bulbousBow">Bulbous Bow</Label>
                    <Select value={data.bulbousBow} onValueChange={(value) => handleChange('bulbousBow', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Bulbous Bow" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="bulbousBow">Anchor Chain Location</Label>
                    <Select value={data.anchorChainLocation} onValueChange={(value) => handleChange('anchorChainLocation', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Anchor Chain Location" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="portSide">Port Side</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="stbdSide">Stbd Side</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="portAndStbdSide">Port & Stbd Side</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="remarks">Remarks</Label>
                    <Input
                        id="remarks"
                        value={data.remarks || ""}
                        onChange={(e) => handleChange('remarks', e.target.value)}
                        placeholder="Enter remarks"
                        className="mt-1"
                    />
                </div>
            </div>
        </div>
    );
};

export default FlatBottomForm;