import React from "react"
import styles from "./Header.module.scss"
import userImage from "../../../images/header/user.svg"
import arrowImage from "../../../images/header/arrow.svg"
import Humburger from "./Humburger/Humburger"
import { useLocation, useNavigate } from "react-router-dom"
const Header = () => {
  let location = useLocation()
  const navigate = useNavigate()
  return (
    <header className={styles.header}>
      {location.pathname !== "/" ? (
        <button type="button" onClick={() => navigate(-1)}>
          <img src={arrowImage} alt="Auth" />
        </button>
      ) : (
        <button type="button" onClick={() => navigate("/auth")}>
          <img src={userImage} alt="Auth" />
        </button>
      )}

      <Humburger />
    </header>
  )
}

export default Header
