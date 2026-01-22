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
// 1. Get Exercises (Searchable, Paginated, & Filterable)
export const getExercises = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const search = req.query.search as string;
    const muscleParam = req.query.muscle;

    // Pagination Params
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Build filter: Show Global exercises OR Custom exercises created by this user
    const where: any = {
      OR: [
        { isCustom: false }, // System exercises
        { createdBy: userId }, // User's custom exercises
      ],
    };

    // Add search filter if provided
    if (search) {
      where.AND = [
        ...(where.AND || []),
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    // Add muscle filter
    if (muscleParam) {
      const muscles = Array.isArray(muscleParam)
        ? (muscleParam as string[])
        : [muscleParam as string];

      // Filter: Exercise must have at least one of the selected muscles
      // We use array_contains: [m] which works for JSONB arrays in Postgres
      const muscleFilters = muscles.map((m) => ({
        primaryMuscles: {
          array_contains: [m],
        },
      }));

      where.AND = [...(where.AND || []), { OR: muscleFilters }];
    }

    const [exercises, total] = await Promise.all([
      prisma.globalExercise.findMany({
        where,
        orderBy: { name: "asc" },
        take: limit,
        skip: skip,
      }),
      prisma.globalExercise.count({ where }),
    ]);

    res.status(200).json({
      data: exercises,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
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

    const {
      name,
      category,
      equipment,
      primaryMuscles,
      secondaryMuscles,
      instructions,
    } = req.body;

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
        primaryMuscles: primaryMuscles || [],
        secondaryMuscles: secondaryMuscles || [],
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

// 3. Update Custom Exercise
export const updateExercise = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    const {
      name,
      category,
      equipment,
      primaryMuscles,
      secondaryMuscles,
      instructions,
    } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Verify ownership
    const exercise = await prisma.globalExercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }

    if (!exercise.isCustom || exercise.createdBy !== userId) {
      res
        .status(403)
        .json({ error: "You can only edit your own custom exercises" });
      return;
    }

    const updated = await prisma.globalExercise.update({
      where: { id },
      data: {
        name,
        category,
        equipment,
        primaryMuscles,
        secondaryMuscles,
        instructions,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Exercise Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 4. Delete Custom Exercise
export const deleteExercise = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Verify ownership
    const exercise = await prisma.globalExercise.findUnique({
      where: { id },
    });

    if (!exercise) {
      res.status(404).json({ error: "Exercise not found" });
      return;
    }

    if (!exercise.isCustom || exercise.createdBy !== userId) {
      res
        .status(403)
        .json({ error: "You can only delete your own custom exercises" });
      return;
    }

    await prisma.globalExercise.delete({
      where: { id },
    });

    res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("Delete Exercise Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
