import { z } from "zod";

export const marineGrowthCondition = z.object({
    hullSections: z.array(z.string()).min(1, { message: "At least one hull section must be selected" }),
    appurtenanceSections: z.array(z.string()).min(1, { message: "At least one appurtenance section must be selected" }),
    initialHullReport: z.string().optional(),
});
