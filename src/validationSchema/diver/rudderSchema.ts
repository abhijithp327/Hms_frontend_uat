import { z } from "zod";

export const rudderSchema = z.object({
    growthType: z
        .array(z.string())
        .min(1, { message: "At least one growth type must be selected" }),

});