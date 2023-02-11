import { Navigate } from "react-router-dom"
import { decodeToken } from "react-jwt"

const ProtectedRoute = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("token"))
  let UserData = decodeToken(token)
  let role
  if (token === null) {
    role = 0
  } else {
    role = UserData.role
  }
  if (role !== 0) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute
