import { Response } from "express";
import { prisma } from "../utils/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

// Helper to create a URL-friendly slug
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// 1. Get Exercises (Searchable)
export const getExercises = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const search = req.query.search as string;

    // Build filter: Show Global exercises OR Custom exercises created by this user
    const where: any = {
      OR: [
        { isCustom: false }, // System exercises
        { createdBy: userId }, // User's custom exercises
      ],
    };

    // Add search filter if provided
    if (search) {
      where.AND = {
        name: { contains: search, mode: "insensitive" },
      };
    }

    const exercises = await prisma.globalExercise.findMany({
      where,
      orderBy: { name: "asc" },
      take: 50, // Limit results for performance
    });

    res.status(200).json(exercises);
  } catch (error) {
    console.error("Get Exercises Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. Create Custom Exercise
export const createCustomExercise = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { name, category, equipment, primaryMuscles, instructions } =
      req.body;

    if (!name || !category) {
      res.status(400).json({ error: "Name and Category are required" });
      return;
    }

    // Generate a unique ID (slug)
    let slug = createSlug(name);
    // Append timestamp to ensure uniqueness for custom exercises
    slug = `${slug}-${Date.now()}`;

    const newExercise = await prisma.globalExercise.create({
      data: {
        id: slug,
        name,
        category,
        equipment: equipment || "Bodyweight",
        primaryMuscles: primaryMuscles || [], // Should be an array like ["chest", "triceps"]
        isCustom: true,
        createdBy: userId,
        instructions,
      },
    });

    res.status(201).json(newExercise);
  } catch (error) {
    console.error("Create Exercise Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
