import { z } from "zod";

export const reportSignOffSchema = z.object({
    vesselRepresentativeName: z.string().optional(),
    vesselRepresentativeDesignation: z.string().optional(),
    stamp: z.string().optional(),
});
