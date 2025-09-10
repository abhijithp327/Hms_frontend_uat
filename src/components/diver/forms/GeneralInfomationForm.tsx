import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import type { FormData } from '@/types/FormTypes';
import { generalInfoSchema } from '@/validationSchema/diver/generalInfoSchema';

interface Props {
    data: FormData['generalInfo'];
    onChange: (data: FormData['generalInfo']) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const GeneralInformationForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const validateForm = (formData: FormData['generalInfo']) => {
        const result = generalInfoSchema.safeParse(formData);

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

    const handleChange = (field: keyof FormData['generalInfo'], value: string | number) => {
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
                handleChange('vesselPicture', imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        handleChange('vesselPicture', '');
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="jobNumber">Job Number <span className="text-red-500">*</span></Label>
                    <Input
                        id="jobNumber"
                        type="number"
                        value={data.jobNumber || ''}
                        onChange={(e) => handleChange('jobNumber', parseInt(e.target.value) || 0)}
                        placeholder="Enter job number"
                        className="mt-1"
                        min="1000"
                        max="9999"
                    />
                    {errors.jobNumber && <p className="text-red-500 text-sm mt-2">{errors.jobNumber}</p>}
                </div>

                <div>
                    <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
                    <Input
                        id="date"
                        type="date"
                        value={data.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className="mt-1"
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
                </div>

            </div>

            {/* Vessel Picture Upload */}
            <div>
                <Label htmlFor="vesselPicture">Vessel Picture</Label>
                <div className="mt-1">
                    {data.vesselPicture ? (
                        <div className="relative inline-block">
                            <img
                                src={data.vesselPicture}
                                alt="Vessel"
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
                            <p className="text-sm text-gray-500 mb-2">Upload vessel picture</p>
                            <Input
                                id="vesselPicture"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <label
                                htmlFor="vesselPicture"
                                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Browse Image
                            </label>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="vesselName">Vessel Name <span className="text-red-500">*</span></Label>
                    <Input
                        id="vesselName"
                        value={data.vesselName}
                        onChange={(e) => handleChange('vesselName', e.target.value)}
                        placeholder="Enter vessel name"
                        className="mt-1"
                    />
                    {errors.vesselName && <p className="text-red-500 text-sm mt-2">{errors.vesselName}</p>}
                </div>

                <div>
                    <Label htmlFor="imoNumber">IMO Number <span className="text-red-500">*</span></Label>
                    <Input
                        id="imoNumber"
                        type="number"
                        value={data.imoNumber || ''}
                        onChange={(e) => handleChange('imoNumber', parseInt(e.target.value) || 0)}
                        placeholder="Enter IMO number"
                        className="mt-1"
                        min="1"
                    />
                    {errors.imoNumber && <p className="text-red-500 text-sm mt-2">{errors.imoNumber}</p>}
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="loa">LOA (metres) <span className="text-red-500">*</span></Label>
                    <Input
                        id="loa"
                        type="number"
                        value={data.loa || ''}
                        onChange={(e) => handleChange('loa', parseFloat(e.target.value) || 0)}
                        placeholder="Length in meters"
                        className="mt-1"
                        min="1"
                        step="0.1"
                    />
                    {errors.loa && <p className="text-red-500 text-sm mt-2">{errors.loa}</p>}
                </div>

                <div>
                    <Label htmlFor="width">Width (metres) <span className="text-red-500">*</span></Label>
                    <Input
                        id="width"
                        type="number"
                        value={data.width || ''}
                        onChange={(e) => handleChange('width', parseFloat(e.target.value) || 0)}
                        placeholder="Width in meters"
                        className="mt-1"
                        min="1"
                        step="0.1"
                    />
                    {errors.width && <p className="text-red-500 text-sm mt-2">{errors.width}</p>}
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="client">Client  <span className="text-red-500">*</span></Label>
                    <Input
                        id="client"
                        value={data.client}
                        onChange={(e) => handleChange('client', e.target.value)}
                        placeholder="Client name"
                        className="mt-1"
                    />
                    {errors.client && <p className="text-red-500 text-sm mt-2">{errors.client}</p>}
                </div>

                <div>
                    <Label htmlFor="clientContactPerson">Client Contact Person</Label>
                    <Input
                        id="clientContactPerson"
                        value={data.clientContactPerson}
                        onChange={(e) => handleChange('clientContactPerson', e.target.value)}
                        placeholder="Contact person name"
                        className="mt-1"
                    />
                    {errors.clientContactPerson && <p className="text-red-500 text-sm mt-2">{errors.clientContactPerson}</p>}
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="agent">Agent <span className="text-red-500">*</span></Label>
                    <Input
                        id="agent"
                        value={data.agent}
                        onChange={(e) => handleChange('agent', e.target.value)}
                        placeholder="Agent name"
                        className="mt-1"
                    />
                    {errors.agent && <p className="text-red-500 text-sm mt-2">{errors.agent}</p>}
                </div>

                <div>
                    <Label htmlFor="agentContactPerson">Agent Contact Person</Label>
                    <Input
                        id="agentContactPerson"
                        value={data.agentContactPerson}
                        onChange={(e) => handleChange('agentContactPerson', e.target.value)}
                        placeholder="Contact person name"
                        className="mt-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                    <Input
                        id="location"
                        value={data.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="Dive location"
                        className="mt-1"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
                </div>
                <div>
                    <Label htmlFor="distanceFromBase">Distance from Base (Nm)</Label>
                    <Input
                        id="distanceFromBase"
                        type="number"
                        value={data.distanceFromBase || ''}
                        onChange={(e) => handleChange('distanceFromBase', parseFloat(e.target.value) || 0)}
                        placeholder="Distance in kilometers"
                        className="mt-1"
                        min="0"
                        step="0.1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="bowDraft">
                        Bow Draft (metres) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="bowDraft"
                        type="number"
                        value={data.bowDraft || ''}
                        onChange={(e) => handleChange('bowDraft', parseFloat(e.target.value) || 0)}
                        placeholder="Bow draft"
                        className="mt-1"
                        min="0"
                        step="0.1"
                    />
                    {errors.bowDraft && <p className="text-red-500 text-sm mt-2">{errors.bowDraft}</p>}
                </div>

                <div>
                    <Label htmlFor="midShipDraft">
                        Mid Ship Draft (metres) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="midShipDraft"
                        type="number"
                        value={data.midShipDraft || ''}
                        onChange={(e) => handleChange('midShipDraft', parseFloat(e.target.value) || 0)}
                        placeholder="Mid ship draft"
                        className="mt-1"
                        min="0"
                        step="0.1"
                    />
                    {errors.midShipDraft && <p className="text-red-500 text-sm mt-2">{errors.midShipDraft}</p>}
                </div>

                <div>
                    <Label htmlFor="sternDraft">
                        Stern Draft (metres) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="sternDraft"
                        type="number"
                        value={data.sternDraft || ''}
                        onChange={(e) => handleChange('sternDraft', parseFloat(e.target.value) || 0)}
                        placeholder="Stern draft"
                        className="mt-1"
                        min="0"
                        step="0.1"
                    />
                    {errors.sternDraft && <p className="text-red-500 text-sm mt-2">{errors.sternDraft}</p>}
                </div>

            </div>
        </div>
    );
};

export default GeneralInformationForm;