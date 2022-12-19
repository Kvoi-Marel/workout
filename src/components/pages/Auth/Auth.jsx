import React from "react"
import Layout from "../../common/Layout"
import bgImage from "../../../images/auth-bg.png"
import Field from "../../ui/Field/Field"
import { useState } from "react"
import Button from "../../ui/Button/Button"
import styles from "./Auth.module.scss"
import { Link } from "react-router-dom"
import Alert from "../../ui/Alert/Alert"
import { useMutation } from "react-query"
import { $api } from "../../../api/api"
import Loader from "../../ui/Loader"
const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("auth")

  const {
    mutate: register,
    isLoading,
    error,
  } = useMutation(
    "Registration",
    () =>
      $api({
        url: "/users",
        type: "POST",
        body: { email, password },
        auth: false,
      }),
    {
      onSuccess(data) {
        console.log(data)
      },
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (type === "auth") {
      console.log("auth")
    } else {
      register()
    }
  }

  return (
    <>
      <Layout bgImage={bgImage} heading="Auth || Register" />
      <div className={styles.wrapper}>
        {error && <Alert type="error" text={error} />}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
          <Field
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Field
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.wrapperBtn}>
            <Button text="Sing in" callback={() => setType("auth")} />
            <Button text="Sing up" callback={() => setType("reg")} />
          </div>
        </form>
      </div>
    </>
  )
}

export default Auth
