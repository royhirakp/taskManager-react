import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Loader from '../Loader';
import Loader from "../Loader/Loder";
// import Coockie from 'js-coocki'
// import Loader from '../Card/Loder';
import "./Login.css";
// import { useDispatch, useSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../Store/slice/TaskListSlice";
// import Test from "../AddTaskForm/test";
const Login = (props) => {
  const [inputEmail, setInputaEmail] = useState("");
  const [inputPassword, setInputaPassword] = useState("");
  const navgate = useNavigate();
  const [errorMessege, setErrorMessege] = useState("");
  const [loader, setLoder] = useState(false);
  const [appInformationStatus, setappInformationStatus] = useState(false);
  // const [checkboxStatus, setCheckboxStatus] = useState(null)
  const [emailValidaion, setEmailValidation] = useState(false);
  const [passWValidaion, setPassWValidation] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((s) => s);
  console.log(data);

  //email and password validation
  useEffect(() => {
    if (/[0-9]/.test(inputPassword) && /[~!@#$%^&*]/.test(inputPassword))
      setPassWValidation(false);
    else if (inputPassword.length > 2) setPassWValidation(true);
    else if (inputPassword.length === 0) setPassWValidation(false);

    if (/[@]/.test(inputEmail) && /[.]/.test(inputEmail))
      setEmailValidation(false);
    else if (inputEmail.length === 0) setEmailValidation(false);
    else setEmailValidation(true);
  }, [inputEmail, inputPassword]);

  //Onsubmit function
  async function onsunmitFun(e) {
    e.preventDefault();
    setLoder(true);
    try {
      const body = {
        email: inputEmail,
        password: inputPassword,
      };

      let res = await axios.post(
        "https://task-manager-gd9n.onrender.com/login",
        body
      );
      dispatch(setUserInfo({ email: inputEmail, token: res.data.token }));
      setErrorMessege("");
      navgate("./main");

      // document.cookie = 'SEmail'+inputEmail+";path=http://localhost:3000"
      // document.cookie = 'Spassword'+inputPassword+";path=http://localhost:3000"
    } catch (error) {
      setErrorMessege(error.response.data.status);
    }
    setLoder(false);
  }

  return (
    <div className="loginBody">
      <div
        className="textForInformationApp"
        style={{ visibility: `${appInformationStatus ? "hidden" : ""}` }}
      >
        <b>TASK MANAGER App</b> .
        <p>
          {" "}
          UI web pages: login, singup, home, addTaskForm
          <br /> try this email and password for quick access .
          <br />
          <b> email: "12@12.com" ; password: "12@12.com" </b>
        </p>
        <p>
          <u>
            <i>
              Redux-toolkit,metarialUI, react, nodejs expressJs, mongoDb,
              Render.com(api), netlify.com(ui)
            </i>
          </u>
        </p>
      </div>
      <div
        className="Login-container"
        onMouseEnter={() => {
          setappInformationStatus(true);
        }}
        onMouseLeave={() => {
          setappInformationStatus(false);
        }}
      >
        <p style={{ textAlign: "center" }}>
          <b>Sing In</b>
        </p>
        <form onSubmit={onsunmitFun}>
          <br />
          Email Address:
          <input
            type="email"
            placeholder="Enter email"
            style={{ border: emailValidaion ? "red 4px solid" : "" }}
            onChange={(e) => setInputaEmail(e.target.value)}
          />
          <br />
          {emailValidaion ? (
            <p style={{ color: "red" }}>not a valid email</p>
          ) : (
            <></>
          )}
          <br />
          Password
          <input
            type="password"
            placeholder="Enter password"
            style={{ border: passWValidaion ? "red 4px solid" : "" }}
            onChange={(e) => setInputaPassword(e.target.value)}
          />
          <br />
          <div className="chekboxRemberme">
            <input
              type="checkbox"
              // onClick={(e)=>{setCheckboxStatus(e.target.checked)}}
            />{" "}
            <p>Remember me?</p>
            <br />
          </div>
          {passWValidaion ? (
            <p style={{ color: "red" }}>not a valid password</p>
          ) : (
            <></>
          )}
          <button
            className="submitButton"
            style={{ width: "100%" }}
            type="submit"
          >
            Submit
          </button>
        </form>
        Forgot <a href="http://ww.ckc.co">Password?</a>
        <br />
        <Link to="/register">SingUp</Link>
        {errorMessege ? <h3 style={{ color: "red" }}>{errorMessege}</h3> : ""}
        {loader ? <Loader /> : <></>}
        {/* <Test/> */}
      </div>
    </div>
  );
};

export default Login;
