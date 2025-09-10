import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types/FormTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleImageUpload from "@/components/MultipleImageUploadSection";
import { iicpAndCathodicProtectionSchema } from "@/validationSchema/diver/iicpAndCathodicProtection";

interface Props {
    data: FormData["iicpAndCathodicProtection"];
    onChange: (data: FormData["iicpAndCathodicProtection"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const IICPCathodicProtectionForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const validateForm = (formData: FormData['iicpAndCathodicProtection']) => {
        const result = iicpAndCathodicProtectionSchema.safeParse(formData);

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

    const handleChange = (field: keyof FormData['iicpAndCathodicProtection'], value: string | number | string[]) => {
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div>
                    <Label htmlFor="presenceOfSacrificialAnodes">Presence of Sacrificial Anodes <span className="text-red-500">*</span></Label>
                    <Select value={data.presenceOfSacrificialAnodes} onValueChange={(value) => handleChange('presenceOfSacrificialAnodes', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Presence of Sacrificial Anodes" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.presenceOfSacrificialAnodes && <p className="text-sm text-red-600 mt-1">{errors.presenceOfSacrificialAnodes}</p>}
                </div>


                <div>
                    <Label htmlFor="presenceOfImpressedCurrentAnodes">Presence of Sacrificial Anodes <span className="text-red-500">*</span></Label>
                    <Select value={data.presenceOfImpressedCurrentAnodes} onValueChange={(value) => handleChange('presenceOfImpressedCurrentAnodes', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Presence of impressed current anodes" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.presenceOfImpressedCurrentAnodes && <p className="text-sm text-red-600 mt-1">{errors.presenceOfImpressedCurrentAnodes}</p>}
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

export default IICPCathodicProtectionForm;