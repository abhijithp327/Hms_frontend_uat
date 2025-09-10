import { z } from "zod";

export const sternThrusterSchema = z.object({

    growthType: z
        .array(z.string())
        .min(1, { message: "At least one growth type must be selected" }),


    irregularities: z
        .array(z.string())
        .min(1, { message: "At least one irregularity must be selected" }),


});
