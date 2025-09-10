import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "@/types/FormTypes";
import { Upload, X } from "lucide-react";
import { bowAreaSchema } from "@/validationSchema/diver/bowAreaSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    data: FormData["bowArea"];
    onChange: (data: FormData["bowArea"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;

}

const BowAreaForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

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

    const validateForm = (formData: FormData['bowArea']) => {

        const result = bowAreaSchema.safeParse(formData);

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

    const handleChange = (field: keyof FormData['bowArea'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
        // Validation will be handled by useEffect
    };

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof FormData["bowArea"]
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageDataUrl = event.target?.result as string;
                handleChange(field, imageDataUrl); // Save only one image per field
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (field: keyof FormData["bowArea"]) => {
        handleChange(field, ""); // Reset image for that field
    };



    return (
        
        <div className="space-y-6 pb-4">

            {/*Port Side Area of the Bow Looking Fwd Before Cleaning  Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div>
                    <Label htmlFor="portSideAreaOfTheBowLookingFwdBeforeCleaning">Port Side Area of the Bow Looking Fwd Before Cleaning</Label>
                    <div className="mt-1">
                        {data.portSideAreaOfTheBowLookingFwdBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.portSideAreaOfTheBowLookingFwdBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("portSideAreaOfTheBowLookingFwdBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="portSideAreaOfTheBowLookingFwdBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "portSideAreaOfTheBowLookingFwdBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="portSideAreaOfTheBowLookingFwdBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/*Port Side Area of the Bow Looking Fwd Before Cleaning  Picture Upload */}
                <div>
                    <Label htmlFor="portSideAreaOfTheBowLookingFwdAfterCleaning">Port Side Area of the Bow Looking Fwd After Cleaning</Label>
                    <div className="mt-1">
                        {data.portSideAreaOfTheBowLookingFwdAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.portSideAreaOfTheBowLookingFwdAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("portSideAreaOfTheBowLookingFwdAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="portSideAreaOfTheBowLookingFwdAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "portSideAreaOfTheBowLookingFwdAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="portSideAreaOfTheBowLookingFwdAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/*Port Side Area of the Bow Looking Fwd Before Cleaning  Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="keelPlateAreaOfTheBowLookingFwdBeforeCleaning">Keel plate area of the bow looking fwd Before cleaning</Label>
                    <div className="mt-1">
                        {data.keelPlateAreaOfTheBowLookingFwdBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.keelPlateAreaOfTheBowLookingFwdBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("keelPlateAreaOfTheBowLookingFwdBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="keelPlateAreaOfTheBowLookingFwdBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "keelPlateAreaOfTheBowLookingFwdBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="keelPlateAreaOfTheBowLookingFwdBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Keel plate area of the bow looking fwd after cleaning Picture Upload */}
                <div>
                    <Label htmlFor="keelPlateAreaOfTheBowLookingFwdAfterCleaning">Keel plate area of the bow looking fwd After cleaning</Label>
                    <div className="mt-1">
                        {data.keelPlateAreaOfTheBowLookingFwdAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.keelPlateAreaOfTheBowLookingFwdAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("keelPlateAreaOfTheBowLookingFwdAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="keelPlateAreaOfTheBowLookingFwdAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "keelPlateAreaOfTheBowLookingFwdAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="keelPlateAreaOfTheBowLookingFwdAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stbd side area of the bow looking fwd before cleaning Picture Upload */}


            </div>

            {/* Stbd side area of the bow looking fwd before cleaning Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="stbdSideAreaOfTheBowLookingFwdBeforeCleaning">Stbd side area of the bow looking fwd Before cleaning</Label>
                    <div className="mt-1">
                        {data.stbdSideAreaOfTheBowLookingFwdBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.stbdSideAreaOfTheBowLookingFwdBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("stbdSideAreaOfTheBowLookingFwdBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="stbdSideAreaOfTheBowLookingFwdBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "stbdSideAreaOfTheBowLookingFwdBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="stbdSideAreaOfTheBowLookingFwdBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Keel plate area of the bow looking fwd after cleaning Picture Upload */}
                <div>
                    <Label htmlFor="stbdSideAreaOfTheBowLookingFwdAfterCleaning">Stbd side area of the bow looking fwd After cleaning</Label>
                    <div className="mt-1">
                        {data.stbdSideAreaOfTheBowLookingFwdAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.stbdSideAreaOfTheBowLookingFwdAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("stbdSideAreaOfTheBowLookingFwdAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="stbdSideAreaOfTheBowLookingFwdAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "stbdSideAreaOfTheBowLookingFwdAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="stbdSideAreaOfTheBowLookingFwdAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>




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
                    {/* {errors.underWaterVisibility && <p className="text-sm text-red-600 mt-1">{errors.underWaterVisibility}</p>} */}
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
                        {errors.hullSections && <p className="text-sm text-red-600 mt-1">{errors.hullSections}</p>}
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
                    <Label htmlFor="paintCondition">Severity</Label>
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
                            <SelectValue placeholder="Select Paint Condition" />
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
                            <SelectValue placeholder="Select Paint Condition" />
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

                {/* conditional statement corrosion */}
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
                    <Label htmlFor="corrosion">Mechanical Damage</Label>
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

            </div>

        </div>
    );
};

export default BowAreaForm;
