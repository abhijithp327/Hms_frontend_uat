import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import type { FormData } from '@/types/FormTypes';
import { Input } from '@/components/ui/input';
import AlertCustomModal from '@/components/AlertCustomModal';



interface Props {
    data: FormData['completeTask'];
    onChange: (data: FormData['completeTask']) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void
}

const CompleteTaskForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const [showSuccess, setShowSuccess] = React.useState<boolean>(false);

    const handleChange = (field: keyof FormData['completeTask'], value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-6 pb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="email">Email Submission</Label>
                    <Input
                        id="email"
                        value={data.email || ""}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Email Submission"
                        className="mt-1"
                    />
                </div>


            </div>


        </div>
    );
};

export default CompleteTaskForm;