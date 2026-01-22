import { Response } from "express";
import { prisma } from "../utils/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

// 1. Create/Log a Workout Session
export const createSession = async (
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
      sessionName,
      routineId, // Optional, if starting from a template
      startTime,
      endTime,
      exercises, // Array of { exerciseId, sets: [{ weight, reps, ... }] }
    } = req.body;

    if (!sessionName) {
      res.status(400).json({ error: "Session name is required" });
      return;
    }

    // Transaction to ensure all data is saved together
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newSession = await prisma.$transaction(async (tx: any) => {
      // Create the main session record
      const session = await tx.workoutSession.create({
        data: {
          userId,
          routineId: routineId || null,
          sessionName,
          startTime: startTime ? new Date(startTime) : new Date(),
          endTime: endTime ? new Date(endTime) : null,
        },
      });

      // If exercises are provided, add them (Entry Flow Step 3/4)
      if (exercises && Array.isArray(exercises)) {
        for (let i = 0; i < exercises.length; i++) {
          const ex = exercises[i];

          // Create Exercise Entry
          const entry = await tx.exerciseEntry.create({
            data: {
              sessionId: session.id,
              exerciseId: ex.exerciseId,
              order: i,
            },
          });

          // Create Sets for this exercise
          if (ex.sets && Array.isArray(ex.sets)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const setsData = ex.sets.map((s: any, index: number) => ({
              exerciseEntryId: entry.id,
              setIndex: index,
              weight: s.weight || 0,
              reps: s.reps || 0,
              isHardSet: s.isHardSet !== undefined ? s.isHardSet : true,
            }));

            await tx.set.createMany({
              data: setsData,
            });
          }
        }
      }

      return session;
    });

    // Fetch the fully created object to return nicely
    const fullSession = await prisma.workoutSession.findUnique({
      where: { id: newSession.id },
      include: {
        exercises: {
          include: {
            sets: true,
            exercise: { include: {} }, // Include global exercise details
          },
          orderBy: { order: "asc" },
        },
      },
    });

    res.status(201).json(fullSession);
  } catch (error) {
    console.error("Create Session Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. View All Sessions (History) w/ Pagination
export const getSessions = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Simple pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const sessions = await prisma.workoutSession.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { startTime: "desc" },
      include: {
        exercises: {
          include: {
            sets: true,
            exercise: { select: { name: true } },
          },
          orderBy: { order: "asc" },
        },
      },
    });

    const total = await prisma.workoutSession.count({ where: { userId } });

    res.status(200).json({
      data: sessions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Sessions Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 3. Get Single Session Details
export const getSessionById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const sessionId = parseInt(req.params.id as string);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (isNaN(sessionId)) {
      res.status(400).json({ error: "Invalid session ID" });
      return;
    }

    const session = await prisma.workoutSession.findFirst({
      where: {
        id: sessionId,
        userId: userId, // Ensure user owns the session
      },
      include: {
        exercises: {
          include: {
            sets: true,
            exercise: true,
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.status(200).json(session);
  } catch (error) {
    console.error("Get Session Details Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 4. Delete Session
export const deleteSession = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const sessionId = parseInt(req.params.id as string);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (isNaN(sessionId)) {
      res.status(400).json({ error: "Invalid session ID" });
      return;
    }

    // Verify ownership
    const session = await prisma.workoutSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      res.status(404).json({ error: "Session not found or unauthorized" });
      return;
    }

    await prisma.workoutSession.delete({
      where: { id: sessionId },
    });

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Delete Session Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 5. Update Session (Sync full workout state)
export const updateSession = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const sessionId = parseInt(req.params.id as string);

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (isNaN(sessionId)) {
      res.status(400).json({ error: "Invalid session ID" });
      return;
    }

    const {
      sessionName,
      endTime,
      exercises, // Full array of current state
    } = req.body;

    // Verify ownership
    const existingSession = await prisma.workoutSession.findUnique({
      where: { id: sessionId },
    });

    if (!existingSession || existingSession.userId !== userId) {
      res.status(404).json({ error: "Session not found or unauthorized" });
      return;
    }

    // Transaction: Update Session Metadata & Replace Exercises
    const updatedSession = await prisma.$transaction(async (tx: any) => {
      // 1. Update basic info
      await tx.workoutSession.update({
        where: { id: sessionId },
        data: {
          sessionName,
          endTime: endTime ? new Date(endTime) : undefined, // Only update if provided
        },
      });

      // 2. If exercises provided, Replace All (Simplest Sync Strategy)
      if (exercises && Array.isArray(exercises)) {
        // A. Delete all existing entries for this session (cascade deletes sets)
        await tx.exerciseEntry.deleteMany({
          where: { sessionId },
        });

        // B. Re-create everything from current state
        for (let i = 0; i < exercises.length; i++) {
          const ex = exercises[i];

          // Create Exercise Entry
          const entry = await tx.exerciseEntry.create({
            data: {
              sessionId,
              exerciseId: ex.exerciseId,
              order: i,
            },
          });

          // Create Sets
          if (ex.sets && Array.isArray(ex.sets)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const setsData = ex.sets.map((s: any, index: number) => ({
              exerciseEntryId: entry.id,
              setIndex: index,
              weight: s.weight || 0,
              reps: s.reps || 0,
              isHardSet: s.isHardSet !== undefined ? s.isHardSet : true,
            }));

            await tx.set.createMany({
              data: setsData,
            });
          }
        }
      }

      return await tx.workoutSession.findUnique({
        where: { id: sessionId },
        include: {
          exercises: {
            include: {
              sets: true,
              exercise: true,
            },
            orderBy: { order: "asc" },
          },
        },
      });
    });

    res.status(200).json(updatedSession);
  } catch (error) {
    console.error("Update Session Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
