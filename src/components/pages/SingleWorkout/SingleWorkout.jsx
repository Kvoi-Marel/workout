import React, { Fragment, useEffect } from "react"
import Layout from "../../common/Layout"
import bgImage from "../../../images/workout-bg.jpg"
import { useState } from "react"
import styles from "./SingleWorkout.module.scss"
import stylesLayout from "../../common/Layout.module.scss"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useMutation } from "react-query"
import { $api } from "../../../api/api"
import Loader from "../../ui/Loader"
import Header from "../../common/header/Header"
import Counters from "../../ui/Counters/Counters"
import { useQuery } from "react-query"
import Alert from "../../ui/Alert/Alert"
import cn from "classnames"
import Button from "../../ui/Button/Button"

const SingleWorkout = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isSuccess } = useQuery(
    "get workout",
    () =>
      $api({
        url: `/workouts/log/${id}`,
      }),
    {
      refetchOnWindowFocus: false,
    }
  )

  const {
    mutate: setWorkoutCompleted,

    error: errorComleted,
  } = useMutation(
    "Change log state",
    () =>
      $api({
        url: "/workouts/log/completed",
        type: "PUT",
        body: { logId: id },
        auth: false,
      }),
    {
      onSuccess() {
        navigate("/workouts")
      },
    }
  )

  useEffect(() => {
    if (
      isSuccess &&
      data?.exerciseLogs &&
      data.exerciseLogs.length ===
        data.exerciseLogs.filter((log) => log.completed).length
    ) {
      setWorkoutCompleted()
    }
  }, [data?.exerciseLogs])

  return (
    <>
      <div
        className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
        style={{ backgroundImage: `url(${bgImage})`, height: 356 }}
      >
        <Header />

        {isSuccess && (
          <div>
            <time className={styles.time}>{data.minutes + "min"}</time>
            <h1 className={stylesLayout.heading}>{data.name}</h1>
          </div>
        )}
      </div>
      <div className={styles.wrapper}>
        {errorComleted && <Alert type="error" text={errorComleted} />}

        {isSuccess ? (
          <div className={styles.workoutsList}>
            {data.exerciseLogs.map((exLog, idx) => {
              return (
                <Fragment key={idx}>
                  <div
                    className={cn(styles.item, {
                      [styles.completed]: exLog.completed,
                    })}
                  >
                    <button
                      aria-label="Move to exercise"
                      onClick={() => navigate(`/exercises/${exLog._id}`)}
                    >
                      <span>{exLog.exercise.name}</span>
                      <img
                        src={`/uploads/exercises/${exLog.exercise.imageName}.svg`}
                        height="34"
                        alt=""
                      />
                    </button>
                  </div>
                  {idx % 2 !== 0 && <div className={styles.line}></div>}
                </Fragment>
              )
            })}
          </div>
        ) : (
          <Alert type="warning" text="exercises not found" />
        )}
      </div>
    </>
  )
}

export default SingleWorkout
