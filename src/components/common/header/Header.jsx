import React from "react"
import styles from "./Header.module.scss"
import userImage from "../../../images/header/user.svg"
import authImage from "../../../images/header/dumbbell.svg"
import arrowImage from "../../../images/header/arrow.svg"
import Humburger from "./Humburger/Humburger"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"

const Header = () => {
  let location = useLocation()
  const navigate = useNavigate()

  const { isAuth } = useAuth()
  return (
    <header className={styles.header}>
      {location.pathname !== "/" ? (
        <button type="button" onClick={() => navigate(-1)}>
          <img src={arrowImage} alt="back" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate(isAuth ? "/profile" : "/auth")}
        >
          <img src={isAuth ? authImage : userImage} alt="Auth" height="40" />
        </button>
      )}

      <Humburger />
    </header>
  )
}

export default Header
