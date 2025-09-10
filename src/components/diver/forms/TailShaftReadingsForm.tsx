import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types/FormTypes";
import MultipleImageUpload from "@/components/MultipleImageUploadSection";




interface Props {
    data: FormData["tailShaftReadings"];
    onChange: (data: FormData["tailShaftReadings"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const TailShaftReadingsForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {



    // const [errors, setErrors] = useState<Record<string, string>>({});

    // useEffect(() => {
    //     validateForm(data);
    // }, [data]);

    // const validateForm = (formData: FormData['rudderSkeg']) => {
    //     setErrors({});
    //     onValidationChange?.(true, {});
    // };

    const handleChange = (field: keyof FormData['tailShaftReadings'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
    };


    return (
        <div className="space-y-6 pb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <MultipleImageUpload
                    id="tailShaftReadingPicture"
                    label="Tail Shaft Reading Picture"
                    images={data.tailShaftReadingPicture || []}
                    onImagesChange={(images) => handleChange('tailShaftReadingPicture', images)}
                    maxImages={10}
                />


                <div>
                    <Label htmlFor="wearDownReadingsTop">Wear Down Readings - Top</Label>
                    <Input
                        id="wearDownReadingsTop"
                        value={data.wearDownReadingsTop || ""}
                        onChange={(e) => handleChange('wearDownReadingsTop', e.target.value)}
                        placeholder="Enter Wear Down Readings - Top"
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="wearDownReadingsBottom">Wear Down Readings - Bottom</Label>
                    <Input
                        id="wearDownReadingsBottom"
                        value={data.wearDownReadingsBottom || ""}
                        onChange={(e) => handleChange('wearDownReadingsBottom', e.target.value)}
                        placeholder="Enter Wear Down Readings - Bottom"
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

export default TailShaftReadingsForm;