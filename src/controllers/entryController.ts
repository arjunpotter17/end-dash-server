import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { entrySchema } from "../validations/entryValidation.js";
import { registerSchema } from "../validations/registerValidation.js";

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

    // Check if the device is registered
    const isRegistered = await prisma.registeredKeys.findFirst({
      where: {
        Wallet_address,
        Device_id,
      },
    });

    if (!isRegistered) {
      return res.status(400).json({
        error: "Device is not registered. Please register your device first.",
      });
    }

    // Check if a record already exists with the given Wallet_address and Device_id
    const existingRecord = await prisma.records.findFirst({
      where: {
        Wallet_address,
        Device_id,
      },
    });

    let newEntry;

    if (existingRecord) {
      // If the record exists, update it
      newEntry = await prisma.records.update({
        where: {
          Wallet_address: Wallet_address,
        },
        data: {
          SST_value,
          Latitude,
          Longitude,
          End_balance,
          Gaia_balance,
          Time: new Date(Time),
          Claimed: false, // Optionally reset Claimed to false on update
        },
      });
    } else {
      // If no record exists, create a new one
      newEntry = await prisma.records.create({
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
    }

    return res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create or update record" });
  }
};

export const registerDevice = async (req: Request, res: Response) => {
  try {
    const parsedBody = registerSchema.safeParse(req.body);

    // If validation fails, return error
    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.errors });
    }

    const { Wallet_address, Device_id } = req.body;

    // Check if the device is already registered
    const isRegistered = await prisma.registeredKeys.findFirst({
      where: {
        Wallet_address,
      },
    });

    if (isRegistered) {
      return res.status(400).json({
        error: "This PublicKey is already registered to a device",
      });
    }

    const newRegistration = await prisma.registeredKeys.create({
      data: {
        Wallet_address,
        Device_id,
      },
    });

    return res
      .status(201)
      .json({ message: "Device registered successfully", newRegistration });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to register device" });
  }
};

export const getRecentData = async (req: Request, res: Response) => {
  try {
    const { field } = req.query;

    // Get the date from 24 hours ago
    const twentyFourHoursAgo = new Date(
      new Date().getTime() - 24 * 60 * 60 * 1000
    ).toISOString();

    // Determine what fields to select based on the query params
    let selectFields: any = {};
    if (field) {
      const requestedFields = field.split(",");
      if (requestedFields.includes("pubkey")) {
        selectFields = {
          Wallet_address: true,
          Device_id: true,
        };
        // selectFields.Wallet_address = true;
      } else if (requestedFields.includes("sst")) {
        // selectFields.SST_value = true;
        selectFields = {
          SST_value: true,
          Device_id: true,
        };
      } else {
        throw new Error("Invalid field parameter");
      }
    } else {
      // Default to just returning the public keys
      selectFields = {
        Wallet_address: true,
        Device_id: true,
      };
    }

    // Query the database for records from the last 24 hours
    const recentEntries = await prisma.records.findMany({
      where: {
        Time: {
          gte: twentyFourHoursAgo,
        },
      },
      select: selectFields,
    });

    if (recentEntries.length === 0) {
      return res
        .status(204)
        .json({ message: "No records found in the last 24 hours" });
    }

    return res.status(200).json({ data: recentEntries });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to fetch records", message: error.message });
  }
};
