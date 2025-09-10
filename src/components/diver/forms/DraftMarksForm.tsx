import React from "react";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types/FormTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleImageUpload from "@/components/MultipleImageUploadSection";



interface Props {
    data: FormData["draftMarks"];
    onChange: (data: FormData["draftMarks"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const DraftMarksForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {



    // const [errors, setErrors] = useState<Record<string, string>>({});

    // useEffect(() => {
    //     validateForm(data);
    // }, [data]);

    // const validateForm = (formData: FormData['rudderSkeg']) => {
    //     setErrors({});
    //     onValidationChange?.(true, {});
    // };

    const handleChange = (field: keyof FormData['draftMarks'], value: string | number | string[]) => {
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
                    <Label htmlFor="growthCondition">Growth Condition</Label>
                    <Select value={data.growthCondition} onValueChange={(value) => handleChange('growthCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Growth Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="heavy">Heavy</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="moderate">Moderate</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="light">Light</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="visualCondition">Visual Condition</Label>
                    <Select value={data.visualCondition} onValueChange={(value) => handleChange('visualCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Visual Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

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

            </div>

        </div>
    );
};

export default DraftMarksForm;