import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormData } from '@/types/FormTypes';
import { Upload, X } from 'lucide-react';


interface Props {
    data: FormData['reportSignOff'];
    onChange: (data: FormData['reportSignOff']) => void;
}

const ReportSignOffForm: React.FC<Props> = ({ data, onChange }) => {

    const handleChange = (field: keyof FormData['reportSignOff'], value: string) => {
        onChange({ ...data, [field]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageDataUrl = event.target?.result as string;
                handleChange('stamp', imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        handleChange('stamp', '');
    };

    return (
        <div className="space-y-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="vesselRepresentativeName">Vessel Representative Name</Label>
                    <Input
                        id="vesselRepresentativeName"
                        value={data.vesselRepresentativeName || ''}
                        onChange={(e) => handleChange('vesselRepresentativeName', e.target.value)}
                        placeholder="Vessel representative name"
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="vesselRepresentativeDesignation">Vessel Representative Designation</Label>
                    <Input
                        id="vesselRepresentativeDesignation"
                        value={data.vesselRepresentativeDesignation || ''}
                        onChange={(e) => handleChange('vesselRepresentativeDesignation', e.target.value)}
                        placeholder="Vessel representative designation"
                        className="mt-1"
                    />
                </div>
            </div>


            {/* Stamp Picture Upload */}
            <div>
                <Label htmlFor="stamp">Stamp</Label>
                <div className="mt-1">
                    {data.stamp ? (
                        <div className="relative inline-block">
                            <img
                                src={data.stamp}
                                alt="Stamp"
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
                            <p className="text-sm text-gray-500 mb-2">Upload stamp</p>
                            <Input
                                id="stamp"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <label
                                htmlFor="stamp"
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

export default ReportSignOffForm;