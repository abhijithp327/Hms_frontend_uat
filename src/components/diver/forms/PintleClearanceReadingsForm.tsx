import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types/FormTypes";
import MultipleImageUpload from "@/components/MultipleImageUploadSection";




interface Props {
    data: FormData["pintleClearanceReadings"];
    onChange: (data: FormData["pintleClearanceReadings"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const PintleClearanceReadingsForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {



    // const [errors, setErrors] = useState<Record<string, string>>({});

    // useEffect(() => {
    //     validateForm(data);
    // }, [data]);

    // const validateForm = (formData: FormData['rudderSkeg']) => {
    //     setErrors({});
    //     onValidationChange?.(true, {});
    // };

    const handleChange = (field: keyof FormData['pintleClearanceReadings'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
    };


    return (
        <div className="space-y-6 pb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <MultipleImageUpload
                    id="pintleClearanceReadingsPicture"
                    label="Pintle Clearance Readings Picture"
                    images={data.pintleClearanceReadingsPicture || []}
                    onImagesChange={(images) => handleChange('pintleClearanceReadingsPicture', images)}
                    maxImages={10}
                />


                <div>
                    <Label htmlFor="upperPintleClearanceReading">Wear Down Readings - Top</Label>
                    <Input
                        id="upperPintleClearanceReading"
                        value={data.upperPintleClearanceReading || ""}
                        onChange={(e) => handleChange('upperPintleClearanceReading', e.target.value)}
                        placeholder="Enter Upper Pintle Clearance Reading"
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="lowerPintleClearanceReading">Lower Pintle Clearance Reading</Label>
                    <Input
                        id="remarks"
                        value={data.lowerPintleClearanceReading || ""}
                        onChange={(e) => handleChange('lowerPintleClearanceReading', e.target.value)}
                        placeholder="Enter Lower Pintle Clearance Reading"
                        className="mt-1"
                    />
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

export default PintleClearanceReadingsForm;