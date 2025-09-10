import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "@/types/FormTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleImageUpload from "@/components/MultipleImageUploadSection";
import { bowThrusterSchema } from "@/validationSchema/diver/bowThrusterSchema";

interface Props {
    data: FormData["bowThrusters"];
    onChange: (data: FormData["bowThrusters"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const BowThrustersForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const irregularOptions = [
        { id: 1, label: "No Remarks", value: "no remarks" },
        { id: 2, label: "Nicks", value: "nicks" },
        { id: 3, label: "Curls", value: "curls" },
        { id: 4, label: "Cracks", value: "cracks" },
        { id: 5, label: "Pittings", value: "pittings" },
        { id: 6, label: "Tears", value: "tears" },
        { id: 7, label: "Dents", value: "dents" },
        { id: 8, label: "Serrated Edges", value: "serrated edges" },
        { id: 9, label: "Cavitation Marks", value: "cavitation marks" },
        { id: 10, label: "Previous Repairs", value: "previous repairs" },
        { id: 11, label: "Attachment Bolts", value: "attachment bolts" },
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

    const validateForm = (formData: FormData['bowThrusters']) => {
        const result = bowThrusterSchema.safeParse(formData);

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

    const handleChange = (field: keyof FormData['bowThrusters'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
    };


    return (
        <div className="space-y-6 pb-4">

            {/* Before/After Cleaning Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <MultipleImageUpload
                    id="beforeCleaning"
                    label="Before Cleaning"
                    images={data.beforeCleaning || []}
                    onImagesChange={(images) => handleChange('beforeCleaning', images)}
                    maxImages={10}
                />

                <MultipleImageUpload
                    id="afterCleaning"
                    label="After Cleaning"
                    images={data.afterCleaning || []}
                    onImagesChange={(images) => handleChange('afterCleaning', images)}
                    maxImages={10}
                />


                <div>
                    <Label htmlFor="numberOfBlades">Number Of Blades</Label>
                    <Input
                        id="numberOfBlades"
                        type="number"
                        value={data.numberOfBlades || ""}
                        onChange={(e) => handleChange('numberOfBlades', e.target.value)}
                        placeholder="Enter number of blades"
                        className="mt-1"
                    />
                </div>


                <div>
                    <Label htmlFor="bladePitch">Blade Pitch</Label>
                    <Select value={data.bladePitch} onValueChange={(value) => handleChange('bladePitch', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Blade Pitch" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fixed">Fixed</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="variable">Variable</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* {errors.generalCondition && <p className="text-sm text-red-600 mt-1">{errors.generalCondition}</p>} */}
                </div>


                <div>
                    <Label htmlFor="bladeCondition">Blade Condition</Label>
                    <Select value={data.bladeCondition} onValueChange={(value) => handleChange('bladeCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Blade Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
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


                <div>
                    <Label>Irregularities <span className="text-red-500">*</span></Label>
                    <div className="mt-2 space-y-2">
                        {irregularOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.irregularities?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("irregularities", [
                                                ...(data.irregularities || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "irregularities",
                                                (data.irregularities || []).filter((val) => val !== item.value)
                                            );
                                        }
                                    }}
                                />
                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                    </div>
                    {errors.irregularities && <p className="text-sm text-red-600 mt-1">{errors.irregularities}</p>}
                </div>


                <div>
                    <Label htmlFor="bossConeAndHubType">Boss Cone/Hub Type</Label>
                    <Input
                        id="remarks"
                        value={data.bossConeAndHubType || ""}
                        onChange={(e) => handleChange('bossConeAndHubType', e.target.value)}
                        placeholder="Enter boss cone / hub type"
                        className="mt-1"
                    />
                </div>


                <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={data.condition} onValueChange={(value) => handleChange('condition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    <Label htmlFor="mechanicalDamage">Mechanical Damage</Label>
                    <Select value={data.mechanicalDamage} onValueChange={(value) => handleChange('mechanicalDamage', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Mechanical Damage" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
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

                <div>
                    <Label htmlFor="cementCoversIntact">Cement Covers Intact</Label>
                    <Select value={data.cementCoversIntact} onValueChange={(value) => handleChange('cementCoversIntact', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Cement Covers Intact" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    <Label htmlFor="thrusterGridsCondition">Thruster Grids Condition</Label>
                    <Select value={data.thrusterGridsCondition} onValueChange={(value) => handleChange('thrusterGridsCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Thruster Grids Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="typeOfGridAssembly">Type of Grids Assembly</Label>
                    <Select value={data.typeOfGridAssembly} onValueChange={(value) => handleChange('typeOfGridAssembly', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Type of Grids Assembly" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="bolted">Bolted</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="welded">Welded</SelectItem>
                        </SelectContent>
                    </Select>
                </div>



            </div>

        </div>

    );
};

export default BowThrustersForm;