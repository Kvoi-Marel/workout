import React from "react"
import Layout from "../../common/Layout"
import bgImage from "../../../images/new-workout-bg.jpg"
import Field from "../../ui/Field/Field"
import ReactSelect from "react-select"
import { useState } from "react"
import Button from "../../ui/Button/Button"
import styles from "./NewWorkout.module.scss"
import { Link } from "react-router-dom"
const NewWorkout = () => {
  const [name, setName] = useState("")
  const [exercises, setExercises] = useState([])
  const handleSubmit = () => {
    console.log("submit")
  }
  return (
    <>
      <Layout bgImage={bgImage} heading="Create new workout" />
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <Field
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Link to="/new-exercise" className="dark-link">
            Add new exercise
          </Link>
          <ReactSelect
            classNamePrefix="select2-selection"
            placeholder="Exercises..."
            title="Exercises"
            options={[
              { value: "fdsafe", label: "Push-ups" },
              { value: "rsdsdf", label: "Pull-ups" },
            ]}
            value={exercises}
            onChange={setExercises}
            isMulti={true}
          />
          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  )
}

export default NewWorkout
