import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "@/types/FormTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rudderSchema } from "@/validationSchema/diver/rudderSchema";
import { Upload, X } from "lucide-react";

interface Props {
    data: FormData["rudder"];
    onChange: (data: FormData["rudder"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void;
}

const RudderForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

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

    const validateForm = (formData: FormData['rudder']) => {
        const result = rudderSchema.safeParse(formData);

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

    const handleChange = (field: keyof FormData['rudder'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
    };


    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof FormData["rudder"]
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

    const removeImage = (field: keyof FormData["rudder"]) => {
        handleChange(field, ""); // Reset image for that field
    };



    return (
        <div className="space-y-6 pb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="portSideAreaOfTheRudderBeforeCleaning">Port Side Area of the Rudder Before Cleaning</Label>
                    <div className="mt-1">
                        {data.portSideAreaOfTheRudderBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.portSideAreaOfTheRudderBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("portSideAreaOfTheRudderBeforeCleaning")}
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
                                    id="portSideAreaOfTheRudderBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "portSideAreaOfTheRudderBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="portSideAreaOfTheRudderBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="portSideAreaOfTheRudderAfterCleaning">Port Side Area of the Rudder After Cleaning</Label>
                    <div className="mt-1">
                        {data.portSideAreaOfTheRudderAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.portSideAreaOfTheRudderAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("portSideAreaOfTheRudderAfterCleaning")}
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
                                    id="portSideAreaOfTheRudderAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "portSideAreaOfTheRudderAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="portSideAreaOfTheRudderAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="stbdSideAreaOfTheRudderBeforeCleaning">Stbd Side Area of the Rudder Before Cleaning</Label>
                    <div className="mt-1">
                        {data.stbdSideAreaOfTheRudderBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.stbdSideAreaOfTheRudderBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("stbdSideAreaOfTheRudderBeforeCleaning")}
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
                                    id="stbdSideAreaOfTheRudderBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "stbdSideAreaOfTheRudderBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="stbdSideAreaOfTheRudderBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="stbdSideAreaOfTheRudderAfterCleaning">Stbd Side Area of the Rudder After Cleaning</Label>
                    <div className="mt-1">
                        {data.stbdSideAreaOfTheRudderAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.stbdSideAreaOfTheRudderAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("stbdSideAreaOfTheRudderAfterCleaning")}
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
                                    id="stbdSideAreaOfTheRudderAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "stbdSideAreaOfTheRudderAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="stbdSideAreaOfTheRudderAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="portSideAreaOfTheRudderCutoutBeforeCleaning">Port Side Area of the Rudder Cutout Before Cleaning</Label>
                    <div className="mt-1">
                        {data.portSideAreaOfTheRudderCutoutBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.portSideAreaOfTheRudderCutoutBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("portSideAreaOfTheRudderCutoutBeforeCleaning")}
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
                                    id="portSideAreaOfTheRudderCutoutBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "portSideAreaOfTheRudderCutoutBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="portSideAreaOfTheRudderCutoutBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="portSideAreaOfTheRudderCutoutAfterCleaning">Port Side Area of the Rudder Cutout After Cleaning</Label>
                    <div className="mt-1">
                        {data.portSideAreaOfTheRudderCutoutAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.portSideAreaOfTheRudderCutoutAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("portSideAreaOfTheRudderCutoutAfterCleaning")}
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
                                    id="portSideAreaOfTheRudderCutoutAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "portSideAreaOfTheRudderCutoutAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="portSideAreaOfTheRudderCutoutAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="noseAndSoleOfTheRudderBeforeCleaning">Nose and Sole of the Rudder Before Cleaning</Label>
                    <div className="mt-1">
                        {data.noseAndSoleOfTheRudderBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.noseAndSoleOfTheRudderBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("noseAndSoleOfTheRudderBeforeCleaning")}
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
                                    id="noseAndSoleOfTheRudderBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "noseAndSoleOfTheRudderBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="noseAndSoleOfTheRudderBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="noseAndSoleOfTheRudderAfterCleaning">Nose and Sole of the Rudder After Cleaning</Label>
                    <div className="mt-1">
                        {data.noseAndSoleOfTheRudderAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.noseAndSoleOfTheRudderAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("noseAndSoleOfTheRudderAfterCleaning")}
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
                                    id="noseAndSoleOfTheRudderAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "noseAndSoleOfTheRudderAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="noseAndSoleOfTheRudderAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="portSideAreaOfTheRudderCutoutBeforeCleaning">Port Side Area of the Rudder Cutout Before Cleaning</Label>
                    <div className="mt-1">
                        {data.portSideAreaOfTheRudderCutoutBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.portSideAreaOfTheRudderCutoutBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("portSideAreaOfTheRudderCutoutBeforeCleaning")}
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
                                    id="portSideAreaOfTheRudderCutoutBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "portSideAreaOfTheRudderCutoutBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="portSideAreaOfTheRudderCutoutBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="portSideAreaOfTheRudderCutoutAfterCleaning">Port Side Area of the Rudder Cutout After Cleaning</Label>
                    <div className="mt-1">
                        {data.portSideAreaOfTheRudderCutoutAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.portSideAreaOfTheRudderCutoutAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("portSideAreaOfTheRudderCutoutAfterCleaning")}
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
                                    id="portSideAreaOfTheRudderCutoutAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "portSideAreaOfTheRudderCutoutAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="portSideAreaOfTheRudderCutoutAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="stbdSideAreaOfTheRudderCutoutBeforeCleaning">Stbd Side Area of the Rudder Cutout Before Cleaning</Label>
                    <div className="mt-1">
                        {data.stbdSideAreaOfTheRudderCutoutBeforeCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.stbdSideAreaOfTheRudderCutoutBeforeCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("stbdSideAreaOfTheRudderCutoutBeforeCleaning")}
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
                                    id="stbdSideAreaOfTheRudderCutoutBeforeCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "stbdSideAreaOfTheRudderCutoutBeforeCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="stbdSideAreaOfTheRudderCutoutBeforeCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="stbdSideAreaOfTheRudderCutoutAfterCleaning">Stbd Side Area of the Rudder Cutout After Cleaning</Label>
                    <div className="mt-1">
                        {data.stbdSideAreaOfTheRudderCutoutAfterCleaning ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.stbdSideAreaOfTheRudderCutoutAfterCleaning}
                                    alt="port side area of the bow looking fwd before cleaning"
                                    className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage("stbdSideAreaOfTheRudderCutoutAfterCleaning")}
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
                                    id="stbdSideAreaOfTheRudderCutoutAfterCleaning"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, "stbdSideAreaOfTheRudderCutoutAfterCleaning")}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="stbdSideAreaOfTheRudderCutoutAfterCleaning"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Browse Image
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <Label htmlFor="numberOfRudders">Number Of Rudders</Label>
                    <Input
                        id="numberOfRudders"
                        type="number"
                        value={data.numberOfRudders || ""}
                        onChange={(e) => handleChange('numberOfRudders', e.target.value)}
                        placeholder="Enter number of rudders"
                        className="mt-1"
                    />
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

                <div>
                    <Label htmlFor="severity">Severity</Label>
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
                    {/* {errors.generalCondition && <p className="text-sm text-red-600 mt-1">{errors.generalCondition}</p>} */}
                </div>

                <div>
                    <Label htmlFor="weldSeam">Weld Seam </Label>
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
                    {/* {errors.weldSeam && <p className="text-sm text-red-600 mt-1">{errors.weldSeam}</p>} */}
                </div>

                <div>
                    <Label htmlFor="corrosionVisible">Corrosion Visible</Label>
                    <Select value={data.corrosionVisible} onValueChange={(value) => handleChange('corrosionVisible', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Corrosion Visible" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="yes">Yes</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="no">No</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* {errors.corrosionVisible && <p className="text-sm text-red-600 mt-1">{errors.corrosionVisible}</p>} */}
                </div>

                <div>
                    <Label htmlFor="coverPlateAssembly">Cover Plate Assembly</Label>
                    <Select value={data.coverPlateAssembly} onValueChange={(value) => handleChange('coverPlateAssembly', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Cover Plate Assembly" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="welded">Welded</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="bolted">Bolted</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* {errors.corrosionVisible && <p className="text-sm text-red-600 mt-1">{errors.corrosionVisible}</p>} */}
                </div>

                <div>
                    <Label htmlFor="coverPlateLocation">Cover Plate Location</Label>
                    <Select value={data.coverPlateLocation} onValueChange={(value) => handleChange('coverPlateLocation', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Cover Plate Location" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="port face">Port Face</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="stbd face">Stbd Face</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="port and stbd face">Port and Stbd Face</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* {errors.corrosionVisible && <p className="text-sm text-red-600 mt-1">{errors.corrosionVisible}</p>} */}
                </div>

                <div>
                    <Label htmlFor="coverPlateCondition">Cover Plate Condition </Label>
                    <Select value={data.coverPlateCondition} onValueChange={(value) => handleChange('coverPlateCondition', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Cover Plate Condition" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="good">Good</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="fair">Fair</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="poor">Poor</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* {errors.weldSeam && <p className="text-sm text-red-600 mt-1">{errors.weldSeam}</p>} */}
                </div>

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

export default RudderForm;