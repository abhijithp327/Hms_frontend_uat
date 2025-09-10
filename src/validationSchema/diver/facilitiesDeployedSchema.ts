import { z } from "zod";

export const facilitiesDeployedSchema = z.object({
    divingBoat: z.string().optional(),
    divingEquipmentUsed: z
        .array(z.string())
        .min(1, { message: "At least one diving equipment must be selected" }),
});
