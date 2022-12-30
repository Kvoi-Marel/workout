import Layout from "../../common/Layout"
import bgImage from "../../../images/new-exercise-bg.jpg"
import Field from "../../ui/Field/Field"
import { useState } from "react"
import Button from "../../ui/Button/Button"
import styles from "./NewExercise.module.scss"
import { useMutation, useQuery } from "react-query"
import { $api } from "../../../api/api"

import cn from "classnames"
import Alert from "../../ui/Alert/Alert"
import Loader from "../../ui/Loader"

const data = ["chest", "shoulders", "biceps", "legs", "hit"]

const NewExercise = () => {
  const [name, setName] = useState("")
  const [times, setTimes] = useState(0)
  const [imageName, setImageName] = useState("chest")

  const { isSuccess, mutate, isLoading, error } = useMutation(
    "Create new exercise",
    () =>
      $api({
        url: "/exercises",
        type: "POST",
        body: { name, times, imageName },
      }),
    {
      onSuccess() {
        setName("")
        setTimes("")
        setImageName("chest")
      },
    }
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && times && imageName) mutate()
  }

  return (
    <>
      <Layout bgImage={bgImage} heading="Create new exercise" />
      <div className={styles.wrapper}>
        {error && <Alert type="error" text={error} />}
        {isSuccess && <Alert text="Exercise created" />}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
          <Field
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Field
            placeholder="Enter times"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
            required
          />
          <div className={styles.images}>
            {data.map((name) => (
              <img
                key={name}
                src={`/uploads/exercises/${name}.svg`}
                alt={name}
                className={cn({
                  [styles.active]: imageName === name,
                })}
                onClick={() => setImageName(name)}
                draggable={false}
              />
            ))}
          </div>
          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  )
}

export default NewExercise
