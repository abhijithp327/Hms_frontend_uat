import { z } from "zod";

export const pointToNoteSchema = z.object({

    anyNightDivingDone: z.string().min(1, { message: "Any night diving done is required" }),

    entanglementRemovalDone: z.string().min(1, { message: "Entanglement removal done is required" }),


});