import { z } from "zod";

export const registerSchema = z.object({
    Wallet_address: z
        .string()
        .min(32, "Address must be a minimum of 32 characters long")
        .max(44, "Address must be a maximum of 44 characters long"),
    Device_id: z.string().min(1, "Device_id is required"),
});