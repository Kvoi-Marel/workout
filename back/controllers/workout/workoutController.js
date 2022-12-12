import Workout from "../../models/workoutModel.js"
import asyncHandler from "express-async-handler"

export const addNewWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseId } = req.body

  const workout = await Workout.create({
    name,
    exercises: exerciseId,
  })

  res.json(workout)
})

export const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id)
    .populate("exercises")
    .lean()

  const minutes = Math.ceil(workout.exercises.length * 3.7)

  res.json({ ...workout, minutes })
})

export const getWorkouts = asyncHandler(async (req, res) => {
  const workout = await Workout.find({}).populate("exercises")

  res.json(workout)
})

export const updateWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseId, workoutId } = req.body

  const workout = await Workout.findById(workoutId)

  if (!workout) {
    res.status(404)
    throw new Error("Данная тренировка не найдена")
  }

  workout.name = name
  workout.exercises = exerciseId

  const updatedWorkout = await workout.save()
  res.json(updatedWorkout)
})

export const deleteWorkout = asyncHandler(async (req, res) => {
  const { workoutId } = req.body

  const workout = await Workout.findById(workoutId)

  if (!workout) {
    res.status(404)
    throw new Error("Данная тренировка не найдено")
  }

  await workout.remove()
  res.json({ message: "Тренировка была удалена" })
})
