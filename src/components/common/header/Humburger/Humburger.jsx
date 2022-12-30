import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { menu } from "./menuBase"
import haburgerImage from "../../../../images/header/hamburger.svg"
import haburgerClose from "../../../../images/header/hamburger-close.svg"
import styles from "./Humburger.module.scss"
import { useAuth } from "../../../../hooks/useAuth"
import { useOutsideAlerter } from "../../../../hooks/useOutsideAlerter"
const Humburger = () => {
  const { setIsAuth } = useAuth()
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideAlerter(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuth(false)
    setIsComponentVisible(false)
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <img
          src={isComponentVisible ? haburgerClose : haburgerImage}
          alt=""
          height="24"
          draggable={false}
        />
      </button>
      <nav className={isComponentVisible ? styles.menu : ""}>
        {isComponentVisible && (
          <ul>
            {menu.map((item) => (
              <li key={item.title}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  )
}

export default Humburger
