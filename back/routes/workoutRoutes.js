import express from "express"
import {
  createNewWorkoutLog,
  getWorkoutLog,
  updateCompliteWorkoutLog,
} from "../controllers/workout/logController.js"
import {
  addNewWorkout,
  deleteWorkout,
  getWorkout,
  updateWorkout,
} from "../controllers/workout/workoutController.js"
import { protect } from "../midleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .get(protect, getWorkout)
  .post(protect, addNewWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout)
router.route("/log").post(protect, createNewWorkoutLog)
router.route("/log/completed").put(protect, updateCompliteWorkoutLog)
router.route("/:id").get(protect, getWorkout)
router.route("/log/:id").get(protect, getWorkoutLog)

export default router
