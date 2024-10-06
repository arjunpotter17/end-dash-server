import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { entrySchema } from "../validations/entryValidation.js";

const prisma = new PrismaClient();

// Controller to fetch all entries
export const getAllEntries = async (req: Request, res: Response) => {
  try {
    const entries = await prisma.records.findMany();
    if (entries.length === 0) {
      return res.status(204).json({ message: "No records found" });
    }
    return res.status(200).json(entries);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch records" });
  }
};

// Controller to create a new entry
export const createEntry = async (req: Request, res: Response) => {
  try {
    const parsedBody = entrySchema.safeParse(req.body);

    // If validation fails, return error
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.errors });
    }

    const {
      Wallet_address,
      Device_id,
      SST_value,
      Latitude,
      Longitude,
      End_balance,
      Gaia_balance,
      Time,
    } = req.body;

    // Validation can be added here if needed

    const newEntry = await prisma.records.create({
      data: {
        Wallet_address,
        Device_id,
        SST_value,
        Latitude,
        Longitude,
        End_balance,
        Gaia_balance,
        Claimed: false, // Claimed defaults to false
        Time: new Date(Time),
      },
    });

    return res.status(201).json(newEntry);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create record" });
  }
};
