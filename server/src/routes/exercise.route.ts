import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  getExercises,
  createCustomExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exercise.controller.js";

const router = Router();
router.use(authenticateToken);

router.get("/", getExercises);
router.post("/", createCustomExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;
