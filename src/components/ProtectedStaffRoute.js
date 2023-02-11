import { Navigate } from "react-router-dom"
import { decodeToken } from "react-jwt"

const ProtectedStaffRoute = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("token"))
  let UserData = decodeToken(token)
  let role
  if (token === null) {
    role = 0
  } else {
    role = UserData.role
  }
  if (role >= 2) {
    return children
  } else {
    return <Navigate to="/" />
  }
}

export default ProtectedStaffRoute
