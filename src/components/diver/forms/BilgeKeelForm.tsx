import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "@/types/FormTypes";
import { Upload, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bilgeKeelSchema } from "@/validationSchema/diver/bilgeKeelSchema";

interface Props {
    data: FormData["bilgeKeel"];
    onChange: (data: FormData["bilgeKeel"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;

}

const BilgeKeelForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const paintOptions = [
        { id: 1, label: "Leeching", value: "leeching" },
        { id: 2, label: "Blistering", value: "blistering" },
        { id: 3, label: "Cracking", value: "cracking" },
        { id: 4, label: "Abrasion/Scraping", value: "abrasion/scraping" },
        { id: 5, label: "Exposed Bare Metal", value: "exposed bare metal" },
        { id: 6, label: "Grounding Damage", value: "grounding damage" },
    ];


    const growthOptions = [
        { id: 1, label: "Acorn Barnacles", value: "acorn barnacles" },
        { id: 2, label: "Goose Barnacles", value: "goose barnacles" },
        { id: 3, label: "Algae", value: "algae" },
        { id: 4, label: "Slime", value: "slime" },
        { id: 5, label: "Sea Weeds", value: "sea weeds" },
        { id: 6, label: "Tubeworm Casts", value: "tubeworm casts" },
        { id: 7, label: "Mussles", value: "mussles" },
        { id: 8, label: "Marine Grass", value: "marine grass" },
        { id: 9, label: "Calcium Deposits", value: "calcium deposits" },
        { id: 10, label: "Nil", value: "nil" },
    ];

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        validateForm(data);
    }, [data]);

    const validateForm = (formData: FormData['bilgeKeel']) => {

        const result = bilgeKeelSchema.safeParse(formData);

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

    const handleChange = (field: keyof FormData['bilgeKeel'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
        // Validation will be handled by useEffect
    };

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof FormData["bilgeKeel"]
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageDataUrl = event.target?.result as string;
                handleChange(field, imageDataUrl); // Save only one image per field
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (field: keyof FormData["bilgeKeel"]) => {
        handleChange(field, ""); // Reset image for that field
    };



    return (

        <div className="space-y-6 pb-4">

            {/*Port Side Area of the Bow Looking Fwd Before Cleaning  Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div>
                    <Label htmlFor="leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning">Leading Edge of the Port Side Bilge Keel Section Plate Before Cleaning</Label>
                    <div className="mt-1">
                        {data.leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/*Port Side Area of the Bow Looking Fwd Before Cleaning  Picture Upload */}
                <div>
                    <Label htmlFor="leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning">Leading Edge of the Port Side Bilge Keel Section Plate After Cleaning</Label>
                    <div className="mt-1">
                        {data.leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/*Port Side Area of the Bow Looking Fwd Before Cleaning  Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning">Full View of the Port Side Bilge Keel Section Plate Before Cleaning</Label>
                    <div className="mt-1">
                        {data.fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Keel plate area of the bow looking fwd after cleaning Picture Upload */}
                <div>
                    <Label htmlFor="fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning">Full View of the Port Side Bilge Keel Section Plate After Cleaning</Label>
                    <div className="mt-1">
                        {data.fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>




            </div>

            {/* Stbd side area of the bow looking fwd before cleaning Picture Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning">Trailing Edge of the Port Side Bilge Keel Section Plate Before Cleaning</Label>
                    <div className="mt-1">
                        {data.trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                {/* Keel plate area of the bow looking fwd after cleaning Picture Upload */}
                <div>
                    <Label htmlFor="trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning">Trailing Edge of the Port Side Bilge Keel Section Plate After Cleaning</Label>
                    <div className="mt-1">
                        {data.trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>


                <div>
                    <Label htmlFor="fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning">Full View of the Stbd Side Bilge Keel Section Plate Before Cleaning</Label>
                    <div className="mt-1">
                        {data.fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>


                <div>
                    <Label htmlFor="fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning">Full View of the Stbd Side Bilge Keel Section Plate After Cleaning</Label>
                    <div className="mt-1">
                        {data.fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>


                <div>
                    <Label htmlFor="leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning">Leading Edge of the Stbd Side Bilge Keel Section Plate Before Cleaning</Label>
                    <div className="mt-1">
                        {data.leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning">Leading Edge of the Stbd Side Bilge Keel Section Plate After Cleaning</Label>
                    <div className="mt-1">
                        {data.leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>


                <div>
                    <Label htmlFor="trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning">Trailing Edge of the Stbd Side Bilge Keel Section Plate Before Cleaning</Label>
                    <div className="mt-1">
                        {data.trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>


                <div>
                    <Label htmlFor="trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning">Trailing Edge of the Stbd Side Bilge Keel Section Plate After Cleaning</Label>
                    <div className="mt-1">
                        {data.trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Upload an image</p>
                                <Input
                                    id="trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                    {/* {errors.underWaterVisibility && <p className="text-sm text-red-600 mt-1">{errors.underWaterVisibility}</p>} */}
                </div>


                <div>
                    <Label htmlFor="numberOfSegments">Number of Segments</Label>
                    <Input
                        id="numberOfSegments"
                        value={data.numberOfSegments || ""}
                        onChange={(e) => handleChange('numberOfSegments', e.target.value)}
                        placeholder="Enter Number of Segments"
                        className="mt-1"
                    />
                </div>


                <div>
                    <Label>Paint Deterioration</Label>
                    <div className="mt-2 space-y-2">
                        {paintOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.paintDeterioration?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("paintDeterioration", [
                                                ...(data.paintDeterioration || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "paintDeterioration",
                                                (data.paintDeterioration || []).filter((val) => val !== item.value)
                                            );
                                        }
                                    }}
                                />

                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div>
                    <Label htmlFor="areaAffected">Area Affected (%)</Label>
                    <Input
                        id="areaAffected"
                        value={data.areaAffected || ""}
                        onChange={(e) => handleChange('areaAffected', e.target.value)}
                        placeholder="Enter area affected"
                        className="mt-1"
                    />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                <div>
                    <Label>Growth Type <span className="text-red-500">*</span></Label>
                    <div className="mt-2 space-y-2">
                        {growthOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.growthType?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("growthType", [
                                                ...(data.growthType || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "growthType",
                                                (data.growthType || []).filter((val) => val !== item.value)
                                            );
                                        }
                                    }}
                                />

                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                        {errors.growthType && <p className="text-sm text-red-600 mt-1">{errors.growthType}</p>}
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="thickness">Thickness (mm)</Label>
                    <Input
                        id="thickness"
                        value={data.thickness || ""}
                        onChange={(e) => handleChange('thickness', e.target.value)}
                        placeholder="Enter thickness"
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="coverage">Coverage (%)</Label>
                    <Input
                        id="coverage"
                        value={data.coverage || ""}
                        onChange={(e) => handleChange('coverage', e.target.value)}
                        placeholder="Enter coverage"
                        className="mt-1"
                    />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="paintCondition">Severity</Label>
                    <Select value={data.severity} onValueChange={(value) => handleChange('severity', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="light">Light</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="scattered">Scattered</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="moderate">Moderate</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="heavy">Heavy</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="noRemarks">No Remarks</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    <Label htmlFor="weldSeamCondition">Weld Seam Condition <span className="text-red-500">*</span></Label>
                    <Select value={data.weldSeamCondition} onValueChange={(value) => handleChange('weldSeamCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Paint Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.weldSeamCondition && <p className="text-sm text-red-600 mt-1">{errors.weldSeamCondition}</p>}
                </div>

                <div>
                    <Label htmlFor="corrosion">Corrosion <span className="text-red-500">*</span></Label>
                    <Select value={data.corrosion} onValueChange={(value) => handleChange('corrosion', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Corrosion" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.corrosion && <p className="text-sm text-red-600 mt-1">{errors.corrosion}</p>}
                </div>

                {/* conditional statement corrosion */}
                {data.corrosion === "yes" && (
                    <>
                        <div>
                            <Label htmlFor="corrosionSeverity">Corrosion Severity <span className="text-red-500">*</span></Label>
                            <Select value={data.corrosionSeverity} onValueChange={(value) => handleChange('corrosionSeverity', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select Corrosion Severity" />
                                </SelectTrigger>
                                <SelectContent className="z-50 bg-white shadow-md" position="popper">
                                    <SelectItem className="hover:bg-gray-100 cursor-pointer" value="light">Light</SelectItem>
                                    <SelectItem className="hover:bg-gray-100 cursor-pointer" value="moderate">Moderate</SelectItem>
                                    <SelectItem className="hover:bg-gray-100 cursor-pointer" value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.corrosionSeverity && <p className="text-sm text-red-600 mt-1">{errors.corrosionSeverity}</p>}
                        </div>

                        <div>
                            <Label htmlFor="corrosionAreaAndDescription">Corrosion Area & Description</Label>
                            <Input
                                id="corrosionAreaAndDescription"
                                value={data.corrosionAreaAndDescription || ""}
                                onChange={(e) => handleChange('corrosionAreaAndDescription', e.target.value)}
                                placeholder="Enter corrosion area and description"
                                className="mt-1"
                            />
                        </div>

                    </>

                )}

                <div>
                    <Label htmlFor="mechanicalDamage">Mechanical Damage</Label>
                    <Select value={data.mechanicalDamage} onValueChange={(value) => handleChange('mechanicalDamage', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Mechanical Damage" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.mechanicalDamage && <p className="text-sm text-red-600 mt-1">{errors.mechanicalDamage}</p>}
                </div>

                  <div>
                    <Label htmlFor="presenceOfSacrificalAnodes">Presence Of Sacrifical Anodes</Label>
                    <Select value={data.presenceOfSacrificalAnodes} onValueChange={(value) => handleChange('presenceOfSacrificalAnodes', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Presence Of Sacrifical Anodes" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
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

export default BilgeKeelForm;
