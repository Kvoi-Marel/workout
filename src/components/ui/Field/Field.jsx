import React from "react"
import styles from "./Field.module.scss"
const Field = ({ placeholder, value, onChange, required, type = "text" }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input}
      required={required}
    />
  )
}

export default Field
