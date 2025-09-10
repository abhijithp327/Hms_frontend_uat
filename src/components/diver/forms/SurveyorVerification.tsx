import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types/FormTypes";
import { Button } from "@/components/ui/button";
import SignatureModal from "@/components/SignatureModal";
import { Input } from "@/components/ui/input";

interface Props {
    data: FormData["surveyorVerification"];
    onChange: (data: FormData["surveyorVerification"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void
}

const SurveyorVerificationForm: React.FC<Props> = ({ data, onChange }) => {

    const [openSignature, setOpenSignature] = useState<boolean>(false);


    const handleChange = (field: keyof FormData['surveyorVerification'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
    };


    return (
        <div className="space-y-6 pb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label htmlFor="approvedBy">Approved By</Label>
                    <Input
                        id="approvedBy"
                        value={data.approvedBy || ""}
                        onChange={(e) => handleChange('approvedBy', e.target.value)}
                        placeholder="Approved by name"
                        className="mt-1"
                    />
                </div>


                <div>
                    <Label htmlFor="classOfSurvey">Class Of Survey</Label>
                    <Input
                        id="classOfSurvey"
                        value={data.classOfSurvey || ""}
                        onChange={(e) => handleChange('classOfSurvey', e.target.value)}
                        placeholder="Class of survey"
                        className="mt-1"
                    />
                </div>


                {/*Signature */}
                <div>
                    <Label>Signature</Label>
                    {data.approvedSignature ? (
                        <img
                            src={data.approvedSignature}
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
                        {data.approvedSignature ? "Edit Signature" : "Add Signature"}
                    </Button>
                </div>


            </div>


            {/* Signature Modal */}
            <SignatureModal
                open={openSignature}
                onClose={() => setOpenSignature(false)}
                onSave={(signature) => handleChange("approvedSignature", signature)}
            />
        </div>
    );
};

export default SurveyorVerificationForm;
