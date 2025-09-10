import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormData } from "@/types/FormTypes";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignatureModal from "@/components/SignatureModal";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    data: FormData["scopeOfWork"];
    onChange: (data: FormData["scopeOfWork"]) => void;
}

const ScopeOfWorkForm: React.FC<Props> = ({ data, onChange }) => {

    const [openSignature, setOpenSignature] = useState<boolean>(false);

    const operationOptions = [
        { id: 1, label: "Photographic Inspection", value: "photographic inspection" },
        { id: 2, label: "Video Inspection", value: "video inspection" },
        { id: 3, label: "CCTV Video Survey", value: "cctv video survey" }, { id: 3, label: "Brush Kart", value: "brush kart" },
        { id: 4, label: "Tail Shaft Readings Measurement", value: "tail shaft readings measurement" },
        { id: 5, label: "Pintle Clearance Readings Measurement", value: "pintle clearance readings measurement" },
        { id: 6, label: "Port Vertical Side Cleaning", value: "port vertical side cleaning" },
        { id: 7, label: "Stbd Vertical Side Cleaning", value: "stbd vertical side cleaning" },
        { id: 9, label: "Flat Bottom Cleaning", value: "flat bottom cleaning" },
        { id: 10, label: "Sea Chest Grids Cleaning", value: "sea chest grids cleaning" },
        { id: 11, label: "Bow Thruster Blade Cleaning", value: "bow thruster blade cleaning" },
        { id: 12, label: "Bow Thruster Grids Cleaning", value: "bow thruster grids cleaning" },
        { id: 13, label: "Bow Thruster Polishing", value: "bow thruster polishing" },
        { id: 14, label: "Stern Thruster Grids Cleaning", value: "stern thruster grids cleaning" },
        { id: 15, label: "Stern Thruster Blade Cleaning", value: "stern thruster blade cleaning" },
        { id: 16, label: "Stern Thruster Polishing", value: "stern thruster polishing" },
        { id: 17, label: "Bilge Keel Cleaning", value: "bilge keel cleaning" },
        { id: 18, label: "Rudder Cleaning", value: "rudder cleaning" },
        { id: 19, label: "Rope Guard Cleaning", value: "rope guard cleaning" },
        { id: 20, label: "Rope Removal", value: "rope removal" },
        { id: 21, label: "Plugging / Unplugging", value: "plugging / unplugging" },
        { id: 22, label: "Blanking / Unblanking", value: "blanking / unblanking" },
        { id: 23, label: "Propeller Cleaning", value: "propeller cleaning" },
        { id: 24, label: "Propeller Polishing", value: "propeller polishing" },
        { id: 25, label: "Stabilizer Cleaning", value: "stabilizer cleaning" },

    ];

    const handleChange = (
        field: keyof FormData["scopeOfWork"],
        value: any
    ) => {
        onChange({ ...data, [field]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageDataUrl = event.target?.result as string;
                handleChange('attendingSurveyorBusinessCardPicture', imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        handleChange('attendingSurveyorBusinessCardPicture', '');
    };

    return (
        <div className="space-y-6 pb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Operations Carried Out</Label>
                    <div className="mt-2 space-y-2">
                        {operationOptions.map((item) => (
                            <div key={item.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={item.value}
                                    checked={data.operationCarriedOut?.includes(item.value)}
                                    onCheckedChange={(checked: boolean | "indeterminate") => {
                                        if (checked === true) {
                                            handleChange("operationCarriedOut", [
                                                ...(data.operationCarriedOut || []),
                                                item.value,
                                            ]);
                                        } else if (checked === false) {
                                            handleChange(
                                                "operationCarriedOut",
                                                (data.operationCarriedOut || []).filter((val) => val !== item.value)
                                            );
                                        }
                                    }}
                                />

                                <Label htmlFor={item.value}>{item.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="divingBoat">Class of Survey</Label>
                    <Input
                        id="classOfSurvey"
                        value={data.classOfSurvey || ""}
                        onChange={(e) => handleChange("classOfSurvey", e.target.value)}
                        placeholder="Class of survey"
                        type="text"
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="attendingSurveyorName">Attending Surveyor Name</Label>
                    <Input
                        id="attendingSurveyorName"
                        value={data.attendingSurveyorName || ""}
                        onChange={(e) => handleChange("attendingSurveyorName", e.target.value)}
                        placeholder="Attending surveyor name"
                        type="text"
                        className="mt-1"
                    />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Attending surveyor business card Picture Upload */}
                <div>
                    <Label htmlFor="attendingSurveyorBusinessCardPicture">Attending Surveyor Business Card Picture</Label>
                    <div className="mt-1">
                        {data.attendingSurveyorBusinessCardPicture ? (
                            <div className="relative inline-block">
                                <img
                                    src={data.attendingSurveyorBusinessCardPicture}
                                    alt="Attending Surveyor Business Card Picture"
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
                                <p className="text-sm text-gray-500 mb-2">Upload Attending Surveyor Business Card Picture</p>
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

                {/* Attending Surveyor Signature */}

                <div>
                    <Label>Attending Surveyor Signature</Label>

                    {data.attendingSurveyorSignature ? (
                        <img
                            src={data.attendingSurveyorSignature}
                            alt="Signature"
                            className="border rounded mt-2 w-64 h-32 object-contain"
                        />
                    ) : (
                        <p className="text-gray-500 mt-2">No signature added yet</p>
                    )}

                    <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => setOpenSignature(true)}
                    >
                        {data.attendingSurveyorSignature ? "Edit Signature" : "Add Signature"}
                    </Button>
                </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="summaryRemarks">Summary / Remarks</Label>
                    <Textarea
                        id="summaryRemarks"
                        value={data.summaryRemarks || ''}
                        onChange={(e) => handleChange('summaryRemarks', e.target.value)}
                        placeholder="Enter summary remarks"
                        className="mt-1"
                        rows={6} // controls height
                    />
                </div>
            </div>


            {/* Signature Modal */}
            <SignatureModal
                open={openSignature}
                onClose={() => setOpenSignature(false)}
                onSave={(signature) => handleChange("attendingSurveyorSignature", signature)}
            />
        </div>

    );
};

export default ScopeOfWorkForm;
