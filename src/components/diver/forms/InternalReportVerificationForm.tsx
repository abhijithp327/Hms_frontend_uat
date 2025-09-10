import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import type { FormData } from "@/types/FormTypes";
import { Button } from "@/components/ui/button";
import SignatureModal from "@/components/SignatureModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    data: FormData["internalReportVerification"];
    onChange: (data: FormData["internalReportVerification"]) => void;
    onValidationChange?: (isValid: boolean, errors: Record<string, string>) => void
}

const InternalReportVerificationForm: React.FC<Props> = ({ data, onChange, onValidationChange }) => {

    const [openSignatureField, setOpenSignatureField] = useState<"preparedSignature" | "verifiedSignature" | "approvedSignature" | null>(null);


    const handleChange = (field: keyof FormData['internalReportVerification'], value: string | number | string[]) => {
        const updated = { ...data, [field]: value };
        onChange(updated);
    };

    const handleSignatureSave = (signature: string) => {
        if (openSignatureField) {
            handleChange(openSignatureField, signature);
            setOpenSignatureField(null); // close after save
        }
    };



    return (
        <div className="space-y-6 pb-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Prepared By */}
                <div>
                    <Label htmlFor="preparedBy">Prepared By</Label>
                    <Select
                        value={data.preparedBy}
                        onValueChange={(value) => handleChange("preparedBy", value)}
                    >

                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Prepared By" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="Prince George">Prince George</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="Dil Sivadas">Dil Sivadas</SelectItem>
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="Deepu MM">Deepu MM</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Prepared By Signature */}
                <div>
                    <Label>Prepared By Signature</Label>
                    {data.preparedSignature ? (
                        <img
                            src={data.preparedSignature}
                            alt="Signature"
                            className="border rounded mt-2 w-64 h-32 object-contain"
                        />
                    ) : (
                        <p className="text-gray-500 mt-2">No signature added yet</p>
                    )}

                    <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => setOpenSignatureField("preparedSignature")}
                    >
                        {data.preparedSignature ? "Edit Signature" : "Add Signature"}
                    </Button>
                </div>

                {/* Verified By */}
                <div>
                    <Label htmlFor="verifiedBy">Verified By</Label>
                    <Select
                        value={data.verifiedBy || "Abhishek Sreekumar"}
                        onValueChange={(value) => handleChange("verifiedBy", value)}
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Verified By" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="Abhishek Sreekumar">Abhishek Sreekumar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Verified By Signature */}
                <div>
                    <Label>Verified By Signature</Label>
                    {data.verifiedSignature ? (
                        <img
                            src={data.verifiedSignature}
                            alt="Signature"
                            className="border rounded mt-2 w-64 h-32 object-contain"
                        />
                    ) : (
                        <p className="text-gray-500 mt-2">No signature added yet</p>
                    )}

                    <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => setOpenSignatureField("verifiedSignature")}
                    >
                        {data.verifiedSignature ? "Edit Signature" : "Add Signature"}
                    </Button>
                </div>

                {/* Approved By */}
                <div>
                    <Label htmlFor="approvedBy">Approved By</Label>
                    <Select value={data.approvedBy || "Capt. Ramneek. Singh"} onValueChange={(value) => handleChange('approvedBy', value)}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select Approved By" />
                        </SelectTrigger>
                        <SelectContent className="z-50 bg-white shadow-md" position="popper">
                            <SelectItem className="hover:bg-gray-100 cursor-pointer" value="Capt. Ramneek. Singh">Capt. Ramneek. Singh</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Approved By Signature */}
                <div>
                    <Label>Approved By Signature</Label>
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
                        onClick={() => setOpenSignatureField("approvedSignature")}
                    >
                        {data.approvedSignature ? "Edit Signature" : "Add Signature"}
                    </Button>
                </div>

            </div>


            {/* Signature Modal */}
            <SignatureModal
                open={!!openSignatureField}
                onClose={() => setOpenSignatureField(null)}
                onSave={handleSignatureSave}
            />
        </div>

    );
};

export default InternalReportVerificationForm;
