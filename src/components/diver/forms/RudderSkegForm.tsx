import React from "react";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types/FormTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleImageUpload from "@/components/MultipleImageUploadSection";


interface Props {
    data: FormData["rudderSkeg"];
    onChange: (data: FormData["rudderSkeg"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const RudderSkegForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

   

    // const [errors, setErrors] = useState<Record<string, string>>({});

    // useEffect(() => {
    //     validateForm(data);
    // }, [data]);

    // const validateForm = (formData: FormData['rudderSkeg']) => {
    //     setErrors({});
    //     onValidationChange?.(true, {});
    // };

    const handleChange = (field: keyof FormData['rudderSkeg'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
    };


    return (
        <div className="space-y-6 pb-4">

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
                    <Label htmlFor="generalCondition">General Condition</Label>
                    <Select value={data.generalCondition} onValueChange={(value) => handleChange('generalCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select General Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="weldSeam">Weld Seam</Label>
                    <Select value={data.weldSeam} onValueChange={(value) => handleChange('weldSeam', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Weld Seam" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>

        </div>
    );
};

export default RudderSkegForm;