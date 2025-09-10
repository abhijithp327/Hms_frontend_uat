import { z } from "zod";

export const divingTeamSchema = z.object({
    divingSupervisor: z.string().optional(),
    leadDriver: z.string().optional(),
    stillCameraman: z.string().optional(),
    videoCameraman: z.string().optional(),
    tailShaftReadings: z.string().optional(),
    pintleReadings: z.string().optional(),
    standByDivers: z.string().optional(),
    tenders: z.string().optional(),
    brushKartCleaning: z.string().optional(),
    marinaCleaning: z.string().optional(),
    polishing: z.string().optional(),
    scraping: z.string().optional(),
    otherTaskAndRespectiveOperators: z.string().optional(),
});
