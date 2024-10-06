import { z } from 'zod';

export const entrySchema = z.object({
    Wallet_address: z.string().nonempty("Wallet_address is required"),
    Device_id: z.string().nonempty("Device_id is required"),
    SST_value: z.number().min(0, "SST_value must be a positive number"),
    Latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    Longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
    End_balance: z.number().min(0, "End_balance must be a positive number"),
    Gaia_balance: z.number().min(0, "Gaia_balance must be a positive number"),
    Time: z.string().nonempty("Time is required").refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid Date format",
    }),
  });