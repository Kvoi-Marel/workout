import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Error404 from "./components/pages/404"
import { useAuth } from "./hooks/useAuth"

import { routes } from "./routes"

const App = () => {
  const { isAuth } = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.component}
            exact={route.exact}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
