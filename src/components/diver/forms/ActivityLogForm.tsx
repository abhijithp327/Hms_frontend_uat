import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { FormData } from "@/types/FormTypes";

interface Props {
    data: FormData["activityLog"];
    onChange: (data: FormData["activityLog"]) => void;
    
}

const ActivityLogForm: React.FC<Props> = ({ data, onChange }) => {
    const handleChange = (field: keyof FormData["activityLog"], value: string | number) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* === Date Fields === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="activityStartDate">Activity Start Date</Label>
                    <Input
                        id="activityStartDate"
                        type="date"
                        value={data.activityStartDate || ""}
                        onChange={(e) => handleChange("activityStartDate", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="divingStartDate">Diving Start Date</Label>
                    <Input
                        id="divingStartDate"
                        type="date"
                        value={data.divingStartDate || ""}
                        onChange={(e) => handleChange("divingStartDate", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="divingEndDate">Diving End Date</Label>
                    <Input
                        id="divingEndDate"
                        type="date"
                        value={data.divingEndDate || ""}
                        onChange={(e) => handleChange("divingEndDate", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="activityEndDate">Activity End Date</Label>
                    <Input
                        id="activityEndDate"
                        type="date"
                        value={data.activityEndDate || ""}
                        onChange={(e) => handleChange("activityEndDate", e.target.value)}
                        className="mt-1"
                    />
                </div>
            </div>

            {/* === Time Fields === */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="onBoardDivingBoat">On Board Diving Boat</Label>
                    <Input
                        id="onBoardDivingBoat"
                        type="time"
                        value={data.onBoardDivingBoat || ""}
                        onChange={(e) => handleChange("onBoardDivingBoat", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="completedLoadingToDivingBoat">Completed Loading to Diving Boat</Label>
                    <Input
                        id="completedLoadingToDivingBoat"
                        type="time"
                        value={data.completedLoadingToDivingBoat || ""}
                        onChange={(e) => handleChange("completedLoadingToDivingBoat", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="leftPort">Left Port</Label>
                    <Input
                        id="leftPort"
                        type="time"
                        value={data.leftPort || ""}
                        onChange={(e) => handleChange("leftPort", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="reachedAlongSideTheVessel">Reached Alongside the Vessel</Label>
                    <Input
                        id="reachedAlongSideTheVessel"
                        type="time"
                        value={data.reachedAlongSideTheVessel || ""}
                        onChange={(e) => handleChange("reachedAlongSideTheVessel", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="sendTheDocumentsForDivingPermission">Sent Documents for Diving Permission</Label>
                    <Input
                        id="sendTheDocumentsForDivingPermission"
                        type="time"
                        value={data.sendTheDocumentsForDivingPermission || ""}
                        onChange={(e) => handleChange("sendTheDocumentsForDivingPermission", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="receivedDocumentAfterSignAndStamp">Received Documents After Sign & Stamp</Label>
                    <Input
                        id="receivedDocumentAfterSignAndStamp"
                        type="time"
                        value={data.receivedDocumentAfterSignAndStamp || ""}
                        onChange={(e) => handleChange("receivedDocumentAfterSignAndStamp", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="commencedDivingOperation">Commenced Diving Operation</Label>
                    <Input
                        id="commencedDivingOperation"
                        type="time"
                        value={data.commencedDivingOperation || ""}
                        onChange={(e) => handleChange("commencedDivingOperation", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="completedDivingOperation">Completed Diving Operation</Label>
                    <Input
                        id="completedDivingOperation"
                        type="time"
                        value={data.completedDivingOperation || ""}
                        onChange={(e) => handleChange("completedDivingOperation", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="sendDocumentAfterJobCompletionForSignAndStamp">Sent Documents After Job Completion</Label>
                    <Input
                        id="sendDocumentAfterJobCompletionForSignAndStamp"
                        type="time"
                        value={data.sendDocumentAfterJobCompletionForSignAndStamp || ""}
                        onChange={(e) => handleChange("sendDocumentAfterJobCompletionForSignAndStamp", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="receivedDocumentsDutySignedAndStamp">Received Duty Signed & Stamped Documents</Label>
                    <Input
                        id="receivedDocumentsDutySignedAndStamp"
                        type="time"
                        value={data.receivedDocumentsDutySignedAndStamp || ""}
                        onChange={(e) => handleChange("receivedDocumentsDutySignedAndStamp", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="castOffFromTheVessel">Cast Off From the Vessel</Label>
                    <Input
                        id="castOffFromTheVessel"
                        type="time"
                        value={data.castOffFromTheVessel || ""}
                        onChange={(e) => handleChange("castOffFromTheVessel", e.target.value)}
                        className="mt-1"
                    />
                </div>

                <div>
                    <Label htmlFor="reachedPort">Reached Port</Label>
                    <Input
                        id="reachedPort"
                        type="time"
                        value={data.reachedPort || ""}
                        onChange={(e) => handleChange("reachedPort", e.target.value)}
                        className="mt-1"
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityLogForm;
