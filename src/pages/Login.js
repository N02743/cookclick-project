import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserLogin } from "../script/controller";
import { useState } from "react";
import { useAuth } from "../script/useAuth";
import moment from "moment";

function Login({ onchangelogin }) {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const { login } = useAuth();

  return (
    <>
      <h1 className="m-5 text-center">Login</h1>
      <div className="flex justify-content-center">
        <Form
          className="new-login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const tokenData = await UserLogin(userDetails);
            localStorage.setItem("userId", JSON.stringify(tokenData.userID))
            if ((await tokenData.token) === "error") {
              setError(true);
            } else {
              await login({ token: tokenData.token });
            }
            onchangelogin(false);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              style={{ borderColor: error ? "#ff0033" : "" }}
            />
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              style={{ borderColor: error ? "#ff0033" : "" }}
            />
            {error && (
              <div
                className="text-sm px-1"
                style={{ color: "#ff0033", fontWeight: "400" }}
              >
                ! Incorrect email or password
              </div>
            )}
          </Form.Group>
          <Button className="mb-1" variant="primary" type="submit">
            Log In
          </Button>
          <hr />
          <div className="text-center text-muted mb-3" id="forget-password">
            or
          </div>
          <Button variant="primary" href="/sign-up">
            Create New Account
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
