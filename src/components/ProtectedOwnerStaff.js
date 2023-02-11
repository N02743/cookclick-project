import { Navigate, useParams } from "react-router-dom"
import { decodeToken } from "react-jwt"

const ProtectedOwnerStaff = ({ children }) => {
  const { uid } = useParams()
  const token = JSON.parse(localStorage.getItem("token"))
  if (token === null) {
    return <Navigate to="/login" />
  }
  const UserData = decodeToken(token)
  if (uid === UserData.userID || UserData.role >= 2) {
    return children
  } else {
    return <Navigate to="/" />
  }
}

export default ProtectedOwnerStaff
