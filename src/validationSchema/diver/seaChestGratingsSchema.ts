import { z } from "zod";

export const seaChestGratingsSchema = z.object({

    growthType: z
        .array(z.string())
        .min(1, { message: "At least one growth type must be selected" }),

    generalCondition: z.string().min(1, "General condition is required"),

    numberOfSeaChestGrids: z.preprocess(
        (val) => Number(val),
        z.number().min(1, "Number of sea chest grids is required")
    ),


    connectionType: z.string().min(1, "Connection type is required"),

});
