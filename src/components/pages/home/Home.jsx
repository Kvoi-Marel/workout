import React from "react"
import Layout from "../../common/Layout"
import Button from "../../ui/Button/Button"
import Counters from "../../ui/Counters/Counters"
import bgImage from "../../../images/home-bg.jpg"
import styles from "./Home.module.scss"
import { Link } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { useQuery } from "react-query"
import { $api } from "../../../api/api"

const Home = () => {
  const { isAuth } = useAuth()

  const { data, isSuccess } = useQuery(
    "home page counters",
    () =>
      $api({
        url: "/users/profile",
      }),
    {
      refetchOnWindowFocus: false,
      enabled: isAuth,
    }
  )

  return (
    <Layout bgImage={bgImage}>
      <Link to={"new-workout"}>
        {isAuth && <Button type="main" text="New" callback={() => {}} />}
      </Link>
      <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
      {isSuccess && isAuth && (
        <Counters
          minutes={data.minutes}
          workouts={data.workouts}
          kgs={data.kgs}
        />
      )}
    </Layout>
  )
}

export default Home
