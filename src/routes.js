import Auth from "./components/pages/Auth/Auth"
import Exercises from "./components/pages/Exercises/Exercises"
import Home from "./components/pages/home/Home"
import NewExercise from "./components/pages/NewExercise/NewExercise"
import NewWorkout from "./components/pages/NewWorkout/NewWorkout"
import Profile from "./components/pages/Profile/Profile"
import ListWorkout from "./components/pages/SingleWorkout/ListWorkout"
import SingleWorkout from "./components/pages/SingleWorkout/SingleWorkout"

export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    auth: false,
  },

  {
    path: "/auth",
    exact: false,
    component: Auth,
    auth: false,
  },

  {
    path: "/new-workout",
    exact: false,
    component: NewWorkout,
    auth: true,
  },

  {
    path: "/new-exercise",
    exact: false,
    component: NewExercise,
    auth: true,
  },
  {
    path: "/profile",
    exact: false,
    component: Profile,
    auth: true,
  },

  {
    path: "/workouts/:id",
    exact: false,
    component: SingleWorkout,
    auth: true,
  },

  {
    path: "/workouts",
    exact: false,
    component: ListWorkout,
    auth: true,
  },

  {
    path: "/exercises/:id",
    exact: false,
    component: Exercises,
    auth: true,
  },
]
