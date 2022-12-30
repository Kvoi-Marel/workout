import React from "react"
import Layout from "../common/Layout"
import styles from "../pages/NewWorkout/NewWorkout.module.scss"
import bgImage from "../../images/new-workout-bg.jpg"

const Error404 = () => {
  return (
    <>
      <Layout bgImage={bgImage} heading="Page not found" />
      <div className={styles.wrapper}>404 page not found</div>
    </>
  )
}

export default Error404
