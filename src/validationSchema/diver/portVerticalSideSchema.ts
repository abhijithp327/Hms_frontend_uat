import { z } from "zod";

export const portVerticalSideSchema = z
    .object({

        portVerticalSideNearToTheFwdAreaBeforeCleaning: z.array(z.string()).optional(),
        portVerticalSideNearToTheFwdAreaAfterCleaning: z.array(z.string()).optional(),
        portVerticalSideNearToTheMidAreaBeforeCleaning: z.array(z.string()).optional(),
        portVerticalSideNearToTheMidAreaAfterCleaning: z.array(z.string()).optional(),
        portVerticalSideNearToTheAftAreaBeforeCleaning: z.array(z.string()).optional(),
        portVerticalSideNearToTheAftAreaAfterCleaning: z.array(z.string()).optional(),

        painCondition: z.string().optional(),
        paintDeterioration: z.array(z.string()).optional(),

        areaAffected: z.preprocess(
            (val) => (val === "" ? undefined : Number(val)),
            z.number().optional()
        ),

        thickness: z.preprocess(
            (val) => (val === "" ? undefined : Number(val)),
            z.number().optional()
        ),
        coverage: z.preprocess(
            (val) => (val === "" ? undefined : Number(val)),
            z.number().optional()
        ),

        growthType: z
            .array(z.string())
            .min(1, { message: "At least one growth type must be selected" }),

        severity: z.string().optional(),

        shellPlateCondition: z.string().min(1, "Shell plate condition is required"),
        weldSeamCondition: z.string().min(1, "Weld seam condition is required"),
        corrosion: z.string().min(1, "Corrosion is required"),

        corrosionSeverity: z.string().optional(),

        corrosionAreaAndDescription: z.string().optional(),
        mechanicalDamage: z.string().optional(),
        typeOfDamage: z.string().optional(),
        remarks: z.string().optional(),
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

