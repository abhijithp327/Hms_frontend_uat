import { z } from "zod";

export const stabilisersSchema = z.object({

    growthType: z
        .array(z.string())
        .min(1, { message: "At least one growth type must be selected" }),

    corrosion: z.string().optional(),

    corrosionSeverity: z.string().optional(),

})
    .superRefine((data, ctx) => {
        if (data.corrosion === "yes") {
            if (!data.corrosionSeverity) {
                ctx.addIssue({
                    code: "custom",
                    path: ["corrosionSeverity"],
                    message: "Corrosion severity is required when corrosion is yes",
                });
            }
        }
    });