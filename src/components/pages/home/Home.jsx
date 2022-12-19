import React from "react"
import Layout from "../../common/Layout"
import Button from "../../ui/Button/Button"
import Counters from "../../ui/Counters/Counters"
import bgImage from "../../../images/home-bg.jpg"
import styles from "./Home.module.scss"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <Layout bgImage={bgImage}>
      <Link to={"new-workout"}>
        <Button type="main" text="New" callback={() => {}} />
      </Link>
      <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
      <Counters />
    </Layout>
  )
}

export default Home