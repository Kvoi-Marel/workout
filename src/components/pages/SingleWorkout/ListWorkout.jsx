import React, { Fragment } from "react"
import Layout from "../../common/Layout"
import bgImage from "../../../images/workout-bg.jpg"
import { useState } from "react"
import styles from "./SingleWorkout.module.scss"
import stylesLayout from "../../common/Layout.module.scss"
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom"
import { useMutation } from "react-query"
import { $api } from "../../../api/api"
import Loader from "../../ui/Loader"
import Header from "../../common/header/Header"
import Counters from "../../ui/Counters/Counters"
import { useQuery } from "react-query"
import Alert from "../../ui/Alert/Alert"

const ListWorkout = () => {
  const navigate = useNavigate()
  const { data, isSuccess } = useQuery(
    "get workouts",
    () =>
      $api({
        url: "/workouts",
      }),
    {
      refetchOnWindowFocus: false,
    }
  )
  const {
    mutate: createWorkoutLog,
    isLoading,
    isSuccess: isSuccessMutate,
    error,
  } = useMutation(
    "Create workout log",
    ({ workoutId }) =>
      $api({
        url: "/workouts/log",
        type: "POST",
        body: { workoutId },
      }),
    {
      onSuccess(data) {
        navigate(`/workouts/${data._id}`)
      },
    }
  )

  return (
    <>
      <Layout bgImage={bgImage} heading="Workout list" />

      <div className={styles.wrapper}>
        {isSuccess ? (
          <div className={styles.workoutsList}>
            {data.map((workout, idx) => (
              <div className={styles.item} key={idx}>
                <button
                  aria-label="Create new workout"
                  onClick={() =>
                    createWorkoutLog({
                      workoutId: workout._id,
                    })
                  }
                >
                  <span>{workout.name}</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Alert type="warning" text="Workout not found" />
        )}
      </div>
    </>
  )
}

export default ListWorkout
