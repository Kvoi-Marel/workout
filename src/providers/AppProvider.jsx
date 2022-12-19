import { useState } from "react"
import App from "../App"
import { AuthContext } from "../context/AuthContext"

const AppProvider = () => {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <App />
    </AuthContext.Provider>
  )
}

export default AppProvider
