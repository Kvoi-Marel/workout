import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { menu } from "./menuBase"
import haburgerImage from "../../../../images/header/hamburger.svg"
import haburgerClose from "../../../../images/header/hamburger-close.svg"
import styles from "./Humburger.module.scss"
const Humburger = () => {
  const [show, setShow] = useState(false)

  const handleLogout = () => {
    console.log("Logout")
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={() => setShow(!show)}>
        <img src={show ? haburgerClose : haburgerImage} alt="" height="24" />
      </button>
      <nav className={show ? styles.menu : ""}>
        {show && (
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
