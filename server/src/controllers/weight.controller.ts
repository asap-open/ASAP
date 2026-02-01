import { Response } from "express";
import { prisma } from "../utils/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

// 1. Log Weight
export const logWeight = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { weightKg, recordedAt } = req.body;

    if (!weightKg) {
      res.status(400).json({ error: "Weight is required" });
      return;
    }

    const result = await prisma.$transaction(async (tx) => {
      const log = await tx.weightLog.create({
        data: {
          userId,
          weightKg: parseFloat(weightKg),
          recordedAt: recordedAt ? new Date(recordedAt) : new Date(),
        },
      });

      await tx.userProfile.update({
        where: { userId },
        data: {
          latestWeightKg: parseFloat(weightKg),
        },
      });
      return log;
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Log Weight Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. Get Weight History
export const getWeightHistory = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const history = await prisma.weightLog.findMany({
      where: { userId },
      orderBy: { recordedAt: "desc" },
      take: 100, // Limit history for graph
    });

    res.status(200).json(history);
  } catch (error) {
    console.error("Get Weight History Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
