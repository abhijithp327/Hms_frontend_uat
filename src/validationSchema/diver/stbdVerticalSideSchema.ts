import { z } from "zod";

export const stbdVerticalSideSchema = z
    .object({

        stbdVerticalSideNearToTheFwdAreaBeforeCleaning: z.array(z.string()).optional(),
        stbdVerticalSideNearToTheFwdAreaAfterCleaning: z.array(z.string()).optional(),
        stbdVerticalSideNearToTheMidAreaBeforeCleaning: z.array(z.string()).optional(),
        stbdVerticalSideNearToTheMidAreaAfterCleaning: z.array(z.string()).optional(),
        stbdVerticalSideNearToTheAftAreaBeforeCleaning: z.array(z.string()).optional(),
        stbdVerticalSideNearToTheAftAreaAfterCleaning: z.array(z.string()).optional(),

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
        mechanicalDamage: z.string().min(1, "Mechanical damage is required"),
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

