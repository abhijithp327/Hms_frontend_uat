import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "@/types/FormTypes";
import { facilitiesDeployedSchema } from "@/validationSchema/diver/facilitiesDeployedSchema";

interface Props {
    data: FormData["facilitiesDeployed"];
    onChange: (data: FormData["facilitiesDeployed"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;

}

const FacilitiesDeployedForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const equipmentOptions = [
        { id: 1, label: "Scuba Replacement Package", value: "scuba replacement package" },
        { id: 2, label: "Hydraulic Power Pack", value: "hydraulic power pack" },
        { id: 3, label: "Brush Kart", value: "brush kart" },
        { id: 4, label: "Propeller Polishing Pack", value: "propeller polishing pack" },
        { id: 5, label: "Underwater Digital Camera - Go Pro Hero 10", value: "underwater digital camera - go pro hero 10" },
        { id: 6, label: "Hand Tools", value: "hand tools" },
        { id: 7, label: "PPE & Diving Gear", value: "ppe & diving gear" },
        { id: 8, label: "Alpha Flag", value: "alpha flag" },
        { id: 9, label: "Bail Out Bottle", value: "bail out bottle" },
        { id: 10, label: "Scrappers", value: "scrappers" },
        { id: 11, label: "Torch", value: "torch" },
        { id: 12, label: "Emergency Oxygen Kit", value: "emergency oxygen kit" },
        { id: 13, label: "First Aid Kit", value: "first aid kit" },
    ];

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const validateForm = (formData: FormData['facilitiesDeployed']) => {
        const result = facilitiesDeployedSchema.safeParse(formData);

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

    const handleChange = (field: keyof FormData['facilitiesDeployed'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
        // Validation will be handled by useEffect
    };

    return (
        <div className="space-y-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="divingBoat">Diving Boat</Label>
                    <Input
                        id="divingBoat"
                        value={data.divingBoat || ""}
                        onChange={(e) => handleChange("divingBoat", e.target.value)}
                        placeholder="Diving boat used"
                        type="text"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Diving Equipment Used <span className="text-red-500">*</span></Label>
                    <div className="mt-2 space-y-2">
                        {equipmentOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.divingEquipmentUsed?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("divingEquipmentUsed", [
                                                ...(data.divingEquipmentUsed || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "divingEquipmentUsed",
                                                (data.divingEquipmentUsed || []).filter((val) => val !== item.value)
                                            );
                                        }
                                    }}
                                />

                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                        {errors.divingEquipmentUsed && <p className="text-sm text-red-600 mt-1">{errors.divingEquipmentUsed}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesDeployedForm;
