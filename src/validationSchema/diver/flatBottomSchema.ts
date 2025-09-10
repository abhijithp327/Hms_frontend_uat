import { z } from "zod";

export const flatBottomSideSchema = z
    .object({

        flatBottomSideNearToTheFwdAreaBeforeCleaning: z.array(z.string()).optional(),
        flatBottomSideNearToTheFwdAreaAfterCleaning: z.array(z.string()).optional(),
        flatBottomSideNearToTheMidAreaBeforeCleaning: z.array(z.string()).optional(),
        flatBottomSideNearToTheMidAreaAfterCleaning: z.array(z.string()).optional(),
        flatBottomSideNearToTheAftAreaBeforeCleaning: z.array(z.string()).optional(),
        flatBottomSideNearToTheAftAreaAfterCleaning: z.array(z.string()).optional(),

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
        groundingDamage: z.string().min(1, "Grounding damage is required"),
        plateIndentations: z.string().min(1, "Plate indentations is required"),
        drainPlugs: z.string().optional(),
        navigationalAids: z.string().optional(),
        dryDockMarksPresent: z.string().optional(),
        dryDockMarksFouled: z.string().optional(),
        dryDockMarksPainted: z.string().optional(),
        bulbousBow: z.string().optional(),
        bowCondition: z.string().optional(),
        anchorChainLocation: z.string().optional(),
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

