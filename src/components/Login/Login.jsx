import React from 'react'
import axios from 'axios';
import {  useState } from "react";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Loader from '../Loader';
import Loader from '../Loader/Loder';
// import Coockie from 'js-coocki'
// import Loader from '../Card/Loder';
import './Login.css'
// import { useDispatch, useSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../Store/slice/TaskListSlice';
const Login = (props) => {
  const [inputEmail, setInputaEmail] = useState('')
  const [inputPassword, setInputaPassword] = useState('')
  const navgate = useNavigate()
  const [errorMessege, setErrorMessege] = useState('')
  const [loader, setLoder] = useState(false)
  const [appInformationStatus, setappInformationStatus ] = useState(false)
  // const [checkboxStatus, setCheckboxStatus] = useState(null)
  // const [emailValidaion, setEmailValidation] = useState(false)
  // const [passWValidaion, setPassWValidation] = useState(false)

  const dispatch = useDispatch();
  const data = useSelector(s=>s)
  console.log(data)

  //email and password validation 
  // useEffect(() => {
  //   if (/[0-9]/.test(inputPassword) && /[~!@#$%^&*]/.test(inputPassword)) setPassWValidation(false)
  //   else if (inputPassword.length > 2) setPassWValidation(true)
  //   else if (inputPassword.length === 0) setPassWValidation(false)

  //   if (/[@]/.test(inputEmail) && /[.]/.test(inputEmail)) setEmailValidation(false)
  //   else if (inputEmail.length === 0) setEmailValidation(false)
  //   else setEmailValidation(true)
  // }, [inputEmail, inputPassword])

  //Onsubmit function 
  async function onsunmitFun(e) {
    e.preventDefault()
    // console.log(inputEmail,inputPassword)
    // console.log(checkboxStatus)
    setLoder(true)
    try {
      const body = {
        email: inputEmail,
        password: inputPassword
      }
    
      let res = await axios.post('https://task-manager-gd9n.onrender.com/login', body)
      // console.log({email: inputEmail, token: res.data.token})
      dispatch(setUserInfo({email: inputEmail, token: res.data.token}))
      setErrorMessege('')
      navgate('./main')
      
      // console.log(res)
      // console.log(res.data.token,'<<<<<token')
      // localStorage.setItem('logToken', res.data.token)
      // localStorage.setItem('userID', inputEmail.split('@')[0])
      // navgate('./main')
      // // coocki
      // document.cookie = 'SEmail'+inputEmail+";path=http://localhost:3000"
      // document.cookie = 'Spassword'+inputPassword+";path=http://localhost:3000"
    } catch (error) {
      setErrorMessege(error.response.data.status)
      // console.log(error.response.data.status,"responde============")
    }
    setLoder(false)
  }

  return (
    <div className='loginBody'>
      <div className='textForInformationApp' style={{visibility:`${appInformationStatus ? "hidden" : ""}`}}>
        this is Task manager app. backend in Nodejs (deploye in render.com). frontend in react.
         State management with tecnology used Redux-toolkit, nodejs expressJs, react, mongoDb, 
         Render.com(api), netlify.com(ui)
      </div>
      <div className='Login-container'
      onMouseEnter={()=>{setappInformationStatus(true)}}
      onMouseLeave={()=>{setappInformationStatus(false)}}
      >

        <p style={{ "textAlign": "center" }}><b>Sing In</b></p>
        <form 
        onSubmit={onsunmitFun}
        >
          <br />
          Email Address:
          <input type='email'
            placeholder='Enter email'
            // style={{ border: emailValidaion ? "red 4px solid" : '' }}
            onChange={(e) => setInputaEmail(e.target.value)}
          /><br />
          {
            // emailValidaion ? <p style={{ color: "red" }}>not a valid email</p> : <></>
          }
          <br />
          Password
          <input type='password'
            placeholder='Enter password'
            // style={{ border: passWValidaion ? "red 4px solid" : "" }}
            onChange={(e) => setInputaPassword(e.target.value)}
          /><br />

          <div className="chekboxRemberme">
            <input type='checkbox'
            // onClick={(e)=>{setCheckboxStatus(e.target.checked)}}
            /> <p>Remember me? </p><br />
          </div>

          {
            // passWValidaion ? <p style={{color:"red"}}>not a valid password</p>: <></>
          }

          <button
            className='submitButton'
            style={{ "width": "100%" }}
            type="submit">
            Submit
          </button>
        </form>
        Forgot <a href="http://ww.ckc.co">Password?</a><br />
        <Link to="/register">SingUp</Link> 
        {errorMessege ? <h3 style={{ color: 'red' }}>{errorMessege}</h3> : ""}
        {loader ? <Loader/> : <></>}
        
      </div>
    </div>
  )
}

export default Login;