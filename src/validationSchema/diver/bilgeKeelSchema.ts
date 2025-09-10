import { z } from "zod";

// Bilge Keel schema
export const bilgeKeelSchema = z
    .object({
        
        leadingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning: z.string().optional(),
        leadingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning: z.string().optional(),
        fullViewOfThePortSideBilgeKeelSectionPlateBeforeCleaning: z.string().optional(),
        fullViewOfThePortSideBilgeKeelSectionPlateAfterCleaning: z.string().optional(),
        trailingEdgeOfThePortSideBilgeKeelSectionPlateBeforeCleaning: z.string().optional(),
        trailingEdgeOfThePortSideBilgeKeelSectionPlateAfterCleaning: z.string().optional(),
        fullViewOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning: z.string().optional(),
        fullViewOfTheStbdSideBilgeKeelSectionPlateAfterCleaning: z.string().optional(),
        leadingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning: z.string().optional(),
        leadingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning: z.string().optional(),
        trailingEdgeOfTheStbdSideBilgeKeelSectionPlateBeforeCleaning: z.string().optional(),
        trailingEdgeOfTheStbdSideBilgeKeelSectionPlateAfterCleaning: z.string().optional(),


        numberOfSegments: z.preprocess(
            (val) => (val === "" ? undefined : Number(val)),
            z.number().optional()
        ),

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

        weldSeamCondition: z.string().optional(),
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

