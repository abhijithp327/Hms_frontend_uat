import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FormData } from '@/types/FormTypes';
import { diveWorkInformationSchema } from '@/validationSchema/diver/diveWorkInfoSchema';


interface Props {
    data: FormData['diveWorkInfo'];
    onChange: (data: FormData['diveWorkInfo']) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const DiveWorkInformationForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {


    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const validateForm = (formData: FormData['diveWorkInfo']) => {
        const result = diveWorkInformationSchema.safeParse(formData);

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

    const handleChange = (field: keyof FormData['diveWorkInfo'], value: string | number) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
        // Validation will be handled by useEffect
    };
    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="maximumDivingDepth">Maximum Diving Depth (meters) <span className="text-red-500">*</span></Label>
                    <Input
                        id="maximumDivingDepth"
                        value={data.maximumDivingDepth || ''}
                        onChange={(e) => handleChange('maximumDivingDepth', parseInt(e.target.value) || 0)}
                        placeholder="Max depth reached"
                        type="number"
                        className="mt-1"
                    />
                    {errors.maximumDivingDepth && <p className="text-sm text-red-600 mt-1">{errors.maximumDivingDepth}</p>}
                </div>


                <div>
                    <Label htmlFor="underWaterVisibility">Underwater Visibility <span className="text-red-500">*</span></Label>
                    <Select value={data.underWaterVisibility} onValueChange={(value) => handleChange('underWaterVisibility', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select underwater visibility" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="excellent">Excellent</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="very good">Very Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="very poor">Very Poor</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.underWaterVisibility && <p className="text-sm text-red-600 mt-1">{errors.underWaterVisibility}</p>}
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="seaWaterCurrent">Sea Water Current <span className="text-red-500">*</span></Label>
                    <Select value={data.seaWaterCurrent} onValueChange={(value) => handleChange('seaWaterCurrent', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select water conditions" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className='hover:bg-gray-100 cursor-pointer' value="strong">Strong</SelectItem>
                            <SelectItem className='hover:bg-gray-100 cursor-pointer' value="moderate">Moderate</SelectItem>
                            <SelectItem className='hover:bg-gray-100 cursor-pointer' value="mild">Mild</SelectItem>
                            <SelectItem className='hover:bg-gray-100 cursor-pointer' value="none">None</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.seaWaterCurrent && <p className="text-sm text-red-600 mt-1">{errors.seaWaterCurrent}</p>}
                </div>
            </div>
        </div>
    );
};

export default DiveWorkInformationForm;