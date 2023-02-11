import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { UserLogin } from "../../script/controller"
import { useState } from "react"
import { useAuth } from "../../script/useAuth"

const StaffLogin = () => {
  // const [userDetails, setUserDetails] = useState({
    // email: "",
    // password: "",
  // })

  // const { login } = useAuth()

  return (
    <>
      <h1 className="m-5 text-center">Staff Login</h1>
      <div className="flex justify-content-center">
        <Form className="flex flex-col formboxAdmin p-4" 
        // onSubmit={async (e) => {
          // e.preventDefault()
          // const tokenData = await UserLogin(userDetails)
          // await login({
            // token: tokenData,
          // });
        // }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usename:</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              // onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              // onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
            />
          </Form.Group>
          <Button
            className="mb-3 staff-button" variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </>
  )
}

export default StaffLogin
