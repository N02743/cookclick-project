import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { decodeToken } from "react-jwt"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null)

  const navigate = useNavigate()

  // call this function when you want to authenticate the user
  const login = async (data) => {
    if (data.token === null) {
      navigate("/login")
    } else {
      setToken(data.token)
      const UserData = decodeToken(data.token)
      if (UserData.role >= 2) {
        navigate("/staff/dashboard");
      } else {
        navigate("/");
      }
    }
  }

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null)
    navigate("/", { replace: true })
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
