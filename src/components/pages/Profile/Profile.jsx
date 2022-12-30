import React from "react"
import Layout from "../../common/Layout"
import bgImage from "../../../images/profile-bg.jpg"
import afterImage from "../../../images/after.jpg"
import { useState } from "react"
import styles from "./Profile.module.scss"
import stylesLayout from "../../common/Layout.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "react-query"
import { $api } from "../../../api/api"
import Loader from "../../ui/Loader"
import Header from "../../common/header/Header"
import Counters from "../../ui/Counters/Counters"
import { useQuery } from "react-query"
import userImage from "../../../images/header/user.svg"

const Profile = () => {
  const { data, isSuccess } = useQuery(
    "home page counters",
    () =>
      $api({
        url: "/users/profile",
      }),
    {
      refetchOnWindowFocus: false,
    }
  )

  return (
    <>
      <div
        className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
        style={{ backgroundImage: `url(${bgImage})`, height: 356 }}
      >
        <Header />

        <div className={styles.center}>
          <img src={userImage} alt="Profile" height="60" />
          {isSuccess && <h1 className={stylesLayout.heading}>{data.email}</h1>}
        </div>

        {isSuccess && (
          <Counters
            minutes={data.minutes}
            workouts={data.workouts}
            kgs={data.kgs}
          />
        )}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.beforeAfter}>
          <div>
            <div className={styles.heading}>Before</div>
            <img src={afterImage} alt="" />
          </div>
          <div>
            <div className={styles.heading}>After</div>
            <img src={afterImage} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
