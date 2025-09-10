import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "@/types/FormTypes";
import { marineGrowthCondition } from "@/validationSchema/diver/marineGrowthCondition";
import { Upload, X } from "lucide-react";

interface Props {
    data: FormData["marineGrowthCondition"];
    onChange: (data: FormData["marineGrowthCondition"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;

}

const MarineGrowthConditionForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const hullOptions = [
        { id: 1, label: "Port Vertical Side", value: "port vertical side" },
        { id: 2, label: "Stbd Vertical Side", value: "stbd vertical side" },
        { id: 3, label: "Flat Bottom", value: "flat bottom" },
        { id: 4, label: "Bow", value: "bow" },
        { id: 5, label: "Stern", value: "stern" },
    ];


    const appurtenanceOptions = [
        { id: 1, label: "Bilge Keel", value: "bilge keel" },
        { id: 2, label: "Cathodic Protection System", value: "cathodic protection system" },
        { id: 3, label: "Stabilizers", value: "stabilizers" },
        { id: 4, label: "Sea Chest Gratings", value: "sea chest gratings" },
        { id: 5, label: "Bow Thruster", value: "bow thruster" },
        { id: 6, label: "Stern Thruster", value: "stern thruster" },
        { id: 7, label: "Emergency Fire Pump", value: "emergency fire pump" },
        { id: 8, label: "Rope Guard", value: "rope guard" },
        { id: 9, label: "Propeller", value: "propeller" },
        { id: 10, label: "Rudder", value: "rudder" },
        { id: 11, label: "Rudder SKEG", value: "rudder skeg" },
        { id: 12, label: "Kort Nozzle", value: "kort nozzle" },
    ];

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const validateForm = (formData: FormData['marineGrowthCondition']) => {

        const result = marineGrowthCondition.safeParse(formData);

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

    const handleChange = (field: keyof FormData['marineGrowthCondition'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
        // Validation will be handled by useEffect
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageDataUrl = event.target?.result as string;
                handleChange('initialHullReport', imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        handleChange('initialHullReport', '');
    };


    return (
        <div className="space-y-6 pb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label>Hull Sections <span className="text-red-500">*</span></Label>
                    <div className="mt-2 space-y-2">
                        {hullOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.hullSections?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("hullSections", [
                                                ...(data.hullSections || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "hullSections",
                                                (data.hullSections || []).filter((val) => val !== item.value)
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

                <div>
                    <Label>Appurtenance Sections <span className="text-red-500">*</span></Label>
                    <div className="mt-2 space-y-2">
                        {appurtenanceOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.appurtenanceSections?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("appurtenanceSections", [
                                                ...(data.appurtenanceSections || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "appurtenanceSections",
                                                (data.appurtenanceSections || []).filter((val) => val !== item.value)
                                            );
                                        }
                                    }}
                                />

                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                        {errors.appurtenanceSections && <p className="text-sm text-red-600 mt-1">{errors.appurtenanceSections}</p>}
                    </div>
                </div>
            </div>

            {/* Initial Hull Report Picture Upload */}
            <div>
                <Label htmlFor="initialHullReport">Initial Hull Report</Label>
                <div className="mt-1">
                    {data.initialHullReport ? (
                        <div className="relative inline-block">
                            <img
                                src={data.initialHullReport}
                                alt="Initial Hull Report"
                                className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500 mb-2">Upload Initial Hull Report</p>
                            <Input
                                id="initialHullReport"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <label
                                htmlFor="initialHullReport"
                                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Browse Image
                            </label>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MarineGrowthConditionForm;
