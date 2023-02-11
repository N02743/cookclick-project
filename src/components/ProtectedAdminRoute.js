import { Navigate } from "react-router-dom"
import { decodeToken } from "react-jwt"

const ProtectedAdminRoute = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("token"))
  let UserData = decodeToken(token)
  let role
  if (token === null) {
    role = 0
  } else {
    role = UserData.role
  }
  if (role === 3) {
    return children
  } else {
    return <Navigate to="/staff/dashboard" />
  }
}

export default ProtectedAdminRoute
