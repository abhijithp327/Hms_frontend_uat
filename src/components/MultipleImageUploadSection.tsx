import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus } from "lucide-react";

interface MultipleImageUploadProps {
    id: string;
    label: string;
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
    required?: boolean;
    className?: string;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
    id,
    label,
    images = [],
    onImagesChange,
    maxImages,
    required = false,
    className = "",
}) => {
    // Handle multiple image uploads
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);

            // Check max images
            const remainingSlots = maxImages ? maxImages - images.length : fileArray.length;
            const filesToProcess = fileArray.slice(0, remainingSlots);

            if (maxImages && images.length >= maxImages) {
                alert(`Maximum ${maxImages} images allowed`);
                return;
            }

            const readers = filesToProcess.map(
                (file) =>
                    new Promise<string>((resolve, reject) => {
                        if (!file.type.startsWith("image/")) {
                            alert("Please select only image files");
                            return reject();
                        }

                        if (file.size > 5 * 1024 * 1024) {
                            alert("Image size should be less than 5MB");
                            return reject();
                        }

                        const reader = new FileReader();
                        reader.onload = (event) => {
                            resolve(event.target?.result as string);
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    })
            );

            Promise.all(readers).then((newImages) => {
                onImagesChange([...images, ...newImages]);
            });
        }
        e.target.value = ""; // reset
    };


    // Remove specific image
    const removeImage = (indexToRemove: number) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        onImagesChange(updatedImages);
    };

    // Remove all images
    const clearAllImages = () => {
        onImagesChange([]);
    };

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-2">
                <Label htmlFor={id}>
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
                {images.length > 0 && (
                    <button
                        type="button"
                        onClick={clearAllImages}
                        className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                        Clear all ({images.length})
                    </button>
                )}
            </div>

            {/* Display existing images */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image}
                                alt={`${label} ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                title="Remove image"
                            >
                                <X size={12} />
                            </button>
                            {/* Image index indicator */}
                            <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload new images - only show if not at max limit */}
            {(!maxImages || images.length < maxImages) && (
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500 mb-2 text-center">
                        Upload multiple images
                        {maxImages && ` (${images.length}/${maxImages})`}
                    </p>
                    <Input
                        id={id}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    <label
                        htmlFor={id}
                        className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
                    >
                        <Plus size={14} />
                        Add Images
                    </label>
                </div>
            )}

            {/* Show message when max limit reached */}
            {maxImages && images.length >= maxImages && (
                <div className="w-full h-20 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                    <p className="text-sm text-gray-500">
                        Maximum {maxImages} images uploaded
                    </p>
                </div>
            )}
        </div>
    );
};

export default MultipleImageUpload;