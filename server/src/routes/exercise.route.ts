import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  getExercises,
  createCustomExercise,
} from "../controllers/exercise.controller.js";

const router = Router();
router.use(authenticateToken);

router.get("/", getExercises);
router.post("/", createCustomExercise);

export default router;
