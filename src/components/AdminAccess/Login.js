import React, { useState, useContext, useRef, useEffect } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import password_hide from "../../assets/password_hide.png";
import password_show from "../../assets/password_show.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { InshortsContext } from "../../Routes";
import { Spinner } from "react-bootstrap";
import { PRODUCT_URL, PATH } from "../../constants";
import "react-toastify/dist/ReactToastify.css";
function Login(props) {
  const { state, dispatch } = useContext(InshortsContext);
  const emailRef = useRef();
  const [hidden, setHidden] = useState(true);
  const [loader, setLoader] = useState(false);
  const [userstate, setState] = useState({
    email: "",
    password: "",
  });

  // console.log("state", state);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch({
        type: "ISLOGGEDIN",
        payload: true,
      });
    }
  }, []);
  const handlePasswordChange = (e) => {
    setState({ ...userstate, password: e.target.value });
  };
  const EmailChange = (e) => {
    setState({ ...userstate, email: e.target.value });
  };
  const toggleShow = () => {
    setHidden(!hidden);
  };
  const LoginSubmission = async (e) => {
    e.preventDefault();
    // setLoader(true);
    try {
      const login = await axios.post(
        ` ${PRODUCT_URL}${PATH.ADMIN}${PATH.SIGNIN}`,
        userstate
      );
      // console.log(login);
      if (login.status === 200) {
        setLoader(false);
        localStorage.setItem("userID", login.data.user._id);
        localStorage.setItem("name", login.data.user.name);
        localStorage.setItem("email", login.data.user.email);
        localStorage.setItem("token", login.data.token);
        toast.success("Logged In success", {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: "ISLOGGEDIN",
          payload: true,
        });
        setTimeout(() => {
          props.history.push("/adminHome");
        }, 1000);
      } else {
        toast.error("Email or Password is wrong", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      setLoader(false);
      if (error) {
        toast.error("Email or Password is wrong", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="Login_container">
        <div className="Login_form">
          <div className="Login_header">
            <img
              src={
                "https://assets.inshorts.com/website_assets/images/logo_inshorts.png"
              }
              alt="logo"
              onClick={() => props.history.push("/")}
              style={{ cursor: "pointer" }}
            />

            <div>Login</div>
          </div>
          <div>
            <form onSubmit={LoginSubmission}>
              <input
                name="email"
                onChange={EmailChange}
                className="textInput"
                placeholder="Email Address"
                size="50"
                required
                value={userstate.email}
              />
              <input
                name="password"
                onChange={handlePasswordChange}
                className="textInput"
                placeholder="Password"
                size="50"
                type={hidden ? "password" : "text"}
                required
                value={userstate.password}
              />
              <div onClick={toggleShow} className="hide_div">
                {hidden ? (
                  <img src={password_hide} alt="hide" className="hide" />
                ) : (
                  <img src={password_show} alt="hide" className="hide" />
                )}
              </div>
              <a className="routing">Forgot Password?</a>
              <Button
                disabled={loader}
                variant="contained"
                color="primary"
                type="submit"
                className="submitbutton"
              >
                {loader ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                {loader ? <div>&nbsp;Logging In...</div> : "Login"}
              </Button>
            </form>
          </div>
        </div>
        <div className="footer">
          <a href="https://inshorts.com/" target="_blank">
            Company Website
          </a>
          <a href="https://inshorts.com/" target="_blank">
            Contact us
          </a>
          <a href="https://inshorts.com/" target="_blank">
            Privacy Policy
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
