import Exercise from "../../models/exerciseModel.js"
import asyncHandler from "express-async-handler"

export const addNewExercise = asyncHandler(async (req, res) => {
  const { name, times, imageName } = req.body

  const exercise = await Exercise.create({
    name,
    times,
    imageName,
  })

  res.json(exercise)
})

export const updateExercise = asyncHandler(async (req, res) => {
  const { name, times, imageName, exerciseId } = req.body

  const exercise = await Exercise.findById(exerciseId)

  if (!exercise) {
    res.status(404)
    throw new Error("Данное упражнение не найдено")
  }

  exercise.name = name
  exercise.times = times
  exercise.imageName = imageName

  const updatedExercise = await exercise.save()
  res.json(updatedExercise)
})

export const deleteExercise = asyncHandler(async (req, res) => {
  const { exerciseId } = req.body

  const exercise = await Exercise.findById(exerciseId)

  if (!exercise) {
    res.status(404)
    throw new Error("Данное упражнение не найдено")
  }

  await exercise.remove()
  res.json({ message: "Упражнение было удалено" })
})

export const getExercise = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find({})

  res.json(exercises)
})
