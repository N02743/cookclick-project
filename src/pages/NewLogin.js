import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserLogin } from "../script/controller";
import { useState } from "react";
import { useAuth } from "../script/useAuth";
import { useNavigate } from "react-router-dom";
import Logo from "../img/logonobg.svg";
import Mypic from "../img/Fall-Ingredient-Cover-Photo.gif";
import { BsFillPersonFill, BsFillKeyFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import moment from "moment";

function NewLogin({ onchangelogin }) {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="new-login-page">
      <div className="login-main-part">
        <div>
          <form
            className="new-login-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const tokenData = await UserLogin(userDetails);
              if (tokenData.message === "You've been banned.") {
                alert(`You've been banned until ${moment(tokenData.banuntil).format("DD/MM/YYYY")}. Reason : ${tokenData.banreason}`);
              }
              if (tokenData.userID !== undefined) {
                localStorage.setItem(
                  "userId",
                  JSON.stringify(tokenData.userID)
                );
              }
              if ((await tokenData.token) === undefined) {
                setError(true);
              } else {
                if (tokenData.token !== undefined) {
                  await login({ token: tokenData.token });
                }
              }
              onchangelogin(false);
            }}
          >
            <span className="new-login-header">Welcome to Cookclick</span>
            <div className="new-login-input-top">
              <AiOutlineMail className="m-1"/>
              <span className="new-login-input-label">Email</span>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <input
                className="new-login-input"
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
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
            <div className="new-login-input-top">
              <BsFillKeyFill className="m-1"/>
              <span className="new-login-input-label">Password</span>
            </div>
            <Form.Group className="mb-5" controlId="formBasicPassword">
              <input
                className="new-login-input"
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
            <button
              className="new-login-button"
              variant="primary"
              type="submit"
            >
              Sign In
            </button>
            <div className="or-text">or</div>
            <button
              className="new-login-button"
              onClick={() => navigate("/sign-up")}
            >
              Create New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
