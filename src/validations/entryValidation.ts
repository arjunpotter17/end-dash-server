import { z } from "zod";

export const entrySchema = z.object({
  Wallet_address: z
    .string()
    .min(32, "Address must be a minimum of 32 characters long")
    .max(44, "Address must be a maximum of 44 characters long"),
  Device_id: z.string().min(1, "Device_id is required"),
  SST_value: z.number().min(0, "SST_value must be a positive number"),
  Latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  Longitude: z
    .number()
    .min(-180)
    .max(180, "Longitude must be between -180 and 180"),
  End_balance: z.number().min(0, "End_balance must be a positive number"),
  Gaia_balance: z.number().min(0, "Gaia_balance must be a positive number"),
  Time: z
    .string()
    .nonempty("Time is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid Date format",
    }),
});
