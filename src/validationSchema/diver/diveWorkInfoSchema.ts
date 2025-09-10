import { z } from "zod";

export const diveWorkInformationSchema = z.object({
  maximumDivingDepth: z.number().min(1, "Maximum diving depth is required"),
  underWaterVisibility: z.string().min(1, "Underwater visibility is required"),
  seaWaterCurrent: z.string().min(1, "Sea water current is required"),
});
