import React from "react"
import Layout from "../../common/Layout"
import bgImage from "../../../images/new-workout-bg.jpg"
import Field from "../../ui/Field/Field"
import ReactSelect from "react-select"
import { useState } from "react"
import Button from "../../ui/Button/Button"
import styles from "./NewWorkout.module.scss"
import { Link } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import { $api } from "../../../api/api"
import Alert from "../../ui/Alert/Alert"
import Loader from "../../ui/Loader"
const NewWorkout = () => {
  const [name, setName] = useState("")
  const [exercisesCurrent, setExercisesCurrent] = useState([])

  const { data, isSuccess } = useQuery(
    "list exercises",
    () =>
      $api({
        url: "/exercises",
      }),
    {
      refetchOnWindowFocus: false,
    }
  )

  const {
    mutate,
    isLoading,
    isSuccess: isSuccessMutate,
    error,
  } = useMutation(
    "Create new workout",
    ({ exIds }) =>
      $api({
        url: "/workouts",
        type: "POST",
        body: { name, exerciseId: exIds },
      }),
    {
      onSuccess() {
        setName("")
        setExercisesCurrent([])
      },
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    const exIds = exercisesCurrent.map((ex) => ex.value)

    mutate({
      exIds,
    })
    console.log(name)
  }
  return (
    <>
      <Layout bgImage={bgImage} heading="Create new workout" />
      <div className={styles.wrapper}>
        {error && <Alert type="error" text={error} />}
        {isSuccessMutate && <Alert text="Workout created" />}
        {isLoading && <Loader />}
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
          {isSuccess && data && (
            <ReactSelect
              classNamePrefix="select2-selection"
              placeholder="Exercises..."
              title="Exercises"
              options={data.map((ex) => ({
                value: ex._id,
                label: ex.name,
              }))}
              value={exercisesCurrent}
              onChange={setExercisesCurrent}
              isMulti={true}
            />
          )}
          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  )
}

export default NewWorkout
