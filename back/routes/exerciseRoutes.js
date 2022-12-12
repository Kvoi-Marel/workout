import express from "express"

import {
  addNewExercise,
  deleteExercise,
  getExercise,
  updateExercise,
} from "../controllers/exercise/exersciseController.js"
import { createNewExerciseLog } from "../controllers/exercise/log/createController.js"
import { getExerciseLog } from "../controllers/exercise/log/getController.js"
import {
  updateCompliteExerciseLog,
  updateExerciseLog,
} from "../controllers/exercise/log/updateController.js"
import { protect } from "../midleware/authMiddleware.js"

const router = express.Router()

router
  .route("/")
  .get(protect, getExercise)
  .post(protect, addNewExercise)
  .put(protect, updateExercise)
  .delete(protect, deleteExercise)
router
  .route("/log")
  .post(protect, createNewExerciseLog)
  .put(protect, updateExerciseLog)

router.route("/log/completed").put(protect, updateCompliteExerciseLog)
router.route("/log/:id").get(protect, getExerciseLog)

export default router
