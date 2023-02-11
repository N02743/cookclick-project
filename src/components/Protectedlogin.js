import { Navigate } from "react-router-dom"

const Protectedlogin = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("token"))
  if (token === null) {
    return children
  } else {
    return <Navigate to="/" />
  }
}

export default Protectedlogin
