import { z } from "zod";

export const iicpAndCathodicProtectionSchema = z.object({

    presenceOfSacrificialAnodes: z.string().min(1, "Presence of sacrificial anodes is required"),

    presenceOfImpressedCurrentAnodes: z.string().min(1, "Presence of impressed current anodes is required"),

});
