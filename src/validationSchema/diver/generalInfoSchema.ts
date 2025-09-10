import { z } from "zod";

// General Info schema
export const generalInfoSchema = z.object({

    jobNumber: z
        .number()
        .int("Job number must be an integer")
        .min(1000, "Job number must be at least 1000")
        .max(9999, "Job number must be at most 9999"),

    date: z.string().min(1, "Date is required"),

    vesselPicture: z
        .union([z.string().url("Must be a valid URL"), z.literal("")])
        .optional(),

    vesselName: z.string().min(1, "Vessel name is required"),

    imoNumber: z.number().min(1, "IMO number is required"),

    loa: z.number().min(1, "LOA is required"),

    width: z.number().min(1, "Width is required"),

    client: z.string().min(1, "Client is required"),

    clientContactPerson: z.string().optional(),

    agent: z.string().min(1, "Agent is required"),

    agentContactPerson: z.string().optional(),

    location: z.string().min(1, "Location is required"),

    distanceFromBase: z.number().min(0, "Distance required").optional(),

    bowDraft: z.number().min(1, "Bow draft is required"),

    midShipDraft: z.number().min(1, "Mid ship draft is required"),

    sternDraft: z.number().min(1, "Stern draft is required"),

});
