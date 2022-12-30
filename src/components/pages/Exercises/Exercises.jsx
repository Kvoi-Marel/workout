import React, { Fragment } from "react"
import Layout from "../../common/Layout"
import bgImage1 from "../../../images/ex-bg-1.jpg"
import bgImage2 from "../../../images/ex-bg-2.jpg"
import checkImage from "../../../images/exercises/check.svg"
import checkCompletedImage from "../../../images/exercises/check-completed.svg"
import { useState } from "react"
import styles from "./Exercises.module.scss"
import stylesLayout from "../../common/Layout.module.scss"
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom"
import { useMutation } from "react-query"
import { $api } from "../../../api/api"
import Loader from "../../ui/Loader"
import Header from "../../common/header/Header"
import Counters from "../../ui/Counters/Counters"
import { useQuery } from "react-query"
import Alert from "../../ui/Alert/Alert"
import cn from "classnames"
import debounce from "lodash.debounce"
import { useEffect } from "react"

const getRandomImage = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Exercises = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [bgImage, setBgImage] = useState(bgImage1)

  useEffect(() => {
    setBgImage(getRandomImage(1, 2) === 1 ? bgImage1 : bgImage2)
  }, [])

  const { data, isSuccess, refetch, isLoading } = useQuery(
    "get exercise log",
    () =>
      $api({
        url: `/exercises/log/${id}`,
      })
  )

  const {
    mutate: changeState,
    isLoading: isLoadingChange,
    error: errorChange,
  } = useMutation(
    "Change log state",
    ({ timeIndex, key, value }) =>
      $api({
        url: "/exercises/log",
        type: "PUT",
        body: { timeIndex, key, value, logId: id },
        auth: false,
      }),
    {
      onSuccess(data) {
        refetch()
      },
    }
  )

  const {
    mutate: setExCompleted,

    error: errorComleted,
  } = useMutation(
    "Change log state",
    () =>
      $api({
        url: "/exercises/log/completed",
        type: "PUT",
        body: { logId: id, completed: true },
      }),
    {
      onSuccess() {
        navigate(`/workouts/${data.workoutLog}`)
      },
    }
  )

  useEffect(() => {
    if (
      isSuccess &&
      data.times.length === data.times.filter((time) => time.completed).length
    ) {
      setExCompleted()
    }
  }, [data?.times, isSuccess])
  return (
    <>
      <div
        className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
        style={{
          backgroundImage: `url(${bgImage})`,
          height: 356,
        }}
      >
        <Header />

        {isSuccess && (
          <div>
            <img
              src={`/uploads/exercises/${data.exercise.imageName}.svg`}
              height="34"
              alt=""
              draggable={false}
            />
            <h1 className={stylesLayout.heading}>{data.exercise.name}</h1>
          </div>
        )}
      </div>
      <div className={styles.wrapper}>
        <div style={{ width: "90%", margin: "0 auto" }}>
          {errorChange && <Alert type="error" text={errorChange} />}
          {errorComleted && <Alert type="error" text={errorComleted} />}
        </div>
        {isSuccess ? (
          <div className={styles.table}>
            <div className={styles.row}>
              <div>
                <span>Previus</span>
              </div>
              <div>
                <span>Repit & Weight</span>
              </div>
              <div>
                <span>Completed</span>
              </div>
            </div>
            {data.times.map((item, idx) => (
              <div
                className={cn(styles.row, {
                  [styles.completed]: item.completed,
                })}
                key={idx}
              >
                <div className={styles.opacity}>
                  <input
                    type="number"
                    defaultValue={item.prevWeight + "kg"}
                    disabled
                  />
                  <i>kg{item.completed ? "" : " "}/</i>
                  <input
                    type="number"
                    defaultValue={item.prevRepeat}
                    disabled
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    pattern="[0-9]*"
                    defaultValue={item.weight + "kg"}
                    onChange={debounce(
                      (e) =>
                        changeState({
                          timeIndex: idx,
                          key: "weight",
                          value: e.target.value,
                        }),
                      800
                    )}
                    disabled={item.completed}
                  />
                  <i>/</i>
                  <input
                    type="text"
                    defaultValue={item.repeat}
                    onChange={debounce(
                      (e) =>
                        changeState({
                          timeIndex: idx,
                          key: "repeat",
                          value: e.target.value,
                        }),
                      800
                    )}
                  />
                </div>

                <div className={styles.opacity}>
                  <img
                    src={item.completed ? checkCompletedImage : checkImage}
                    className={styles.checkbox}
                    alt=""
                    onClick={() =>
                      changeState({
                        timeIndex: idx,
                        key: "completed",
                        value: !item.completed,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Alert type="warning" text="Times not found" />
        )}
      </div>
    </>
  )
}

export default Exercises
