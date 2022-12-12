import asyncHandler from "express-async-handler"
import ExerciseLog from "../../../models/exerciseLogModel.js"

export const updateExerciseLog = asyncHandler(async (req, res) => {
  const { logId, timeIndex, key, value } = req.body

  const currentLog = await ExerciseLog.findById(logId)

  if (!currentLog) {
    res.status(404)
    throw new Error("Данный лог не найден")
  }

  let newTimes = currentLog.times

  if ((!timeIndex && timeIndex !== 0) || !key || (!value && value !== false)) {
    res.status(404)
    throw new Error("Вы не указали все поля")
  }

  newTimes[timeIndex][key] = value

  currentLog.times = newTimes

  const updatedLog = await currentLog.save()
  res.json(updatedLog)
})

export const updateCompliteExerciseLog = asyncHandler(async (req, res) => {
  const { logId, completed } = req.body

  const currentLog = await ExerciseLog.findById(logId).populate(
    "exercise",
    "workout"
  )

  if (!currentLog) {
    res.status(404)
    throw new Error("Данный лог не найден")
  }

  currentLog.completed = completed

  const updatedLog = await currentLog.save()
  res.json(updatedLog)
})
