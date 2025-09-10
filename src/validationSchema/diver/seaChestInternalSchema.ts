import { z } from "zod";

export const seaChestInternalSchema = z.object({

    growthType: z
        .array(z.string())
        .min(1, { message: "At least one growth type must be selected" }),

    generalCondition: z.string().min(1, "General condition is required"),



});
