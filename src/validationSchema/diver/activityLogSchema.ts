import { z } from "zod";

export const activityLogSchema = z.object({

    // Date fields
    activityStartDate: z.string().optional(),
    divingStartDate: z.string().optional(),
    divingEndDate: z.string().optional(),
    activityEndDate: z.string().optional(),

    // Time fields
    onBoardDivingBoat: z.string().optional(),
    completedLoadingToDivingBoat: z.string().optional(),
    leftPort: z.string().optional(),
    reachedAlongSideTheVessel: z.string().optional(),
    sendTheDocumentsForDivingPermission: z.string().optional(),
    receivedDocumentAfterSignAndStamp: z.string().optional(),
    commencedDivingOperation: z.string().optional(),
    completedDivingOperation: z.string().optional(),
    sendDocumentAfterJobCompletionForSignAndStamp: z.string().optional(),
    receivedDocumentsDutySignedAndStamp: z.string().optional(),
    castOffFromTheVessel: z.string().optional(),
    reachedPort: z.string().optional(),

});
