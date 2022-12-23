import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import colors from "colors"
import userRoutes from "./routes/userRouter.js"
import exerciseRoutes from "./routes/exerciseRoutes.js"
import workoutRoutes from "./routes/workoutRoutes.js"
import { connectDB } from "./config/db.js"
import { errorHandler, notFound } from "./midleware/errorMiddleware.js"
import path from "path"
dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

app.use(express.json())

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads/")))

app.use("/api/users", userRoutes)
app.use("/api/exercises", exerciseRoutes)
app.use("/api/workouts", workoutRoutes)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
