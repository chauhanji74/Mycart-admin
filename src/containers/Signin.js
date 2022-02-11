import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import simg from "../images/signin-image.jpg";
import "./Sl.css";
//import {login} from '../actions/index';
//import { useDispatch } from 'react-redux';

/**
* @author
* @function Signin
**/

export const Signin = (props) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  let item = {email, password} 
  const loginUser = async (e) =>{
    e.preventDefault();
    const res = await fetch("/admin/signin",{
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(item)
    });

    const data = await res.json();
    if(res.status === 400 || !data){
      window.alert("login failed");
      console.log("login failed");
    }else{
      localStorage.setItem("data",JSON.stringify(data));
      window.sessionStorage.setItem("key", (data.token));
      window.alert(" login successful");
      console.log("login successful");
      navigate('/')
    }
  }



  /*const dispatch = useDispatch();

  const userLogin = (e) =>{
    e.preventDefault();
    const user = {
      email: 'lalitsinghchauhan74@gmail.com',
      password: 'Lalit@123'
    }
    dispatch(login(user));
  }*/

  return(
    <Layout>
      <div className="main">
        <section className="sign-in">
          <div className="container1">
            {/*<div className='text-center' style={{paddingTop: "2rem", borderRadius: ".3rem", color: "violet"}}>
              <h1>Mycart Admin</h1>
            </div>*/}
            <div className="signin-content">
              <div className="signin-image">
                <figure><img src={simg} alt="sing up image" /></figure>
                <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>
              </div>

              <div className="signin-form">
                <h2 className="form-title">Sign in</h2>
                  <form method="POST" className="register-form" id="login-form" >
                    <div className="form-group">
                      <label for="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                      <input type="text" name="your_name" id="your_name" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Your Email"/>
                    </div>
                    <div className="form-group">
                      <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                      <input type="password" name="your_pass" id="your_pass" value={password} onChange={(e) => setPass(e.target.value)} placeholder="Password"/>
                    </div>
                    <div className="form-group form-button">
                      <input type="submit" name="signin" id="signin" className="form-submit" onClick={loginUser} value="Log in"/>
                    </div>
                  </form>
                  <div className="social-login">
                    <span className="social-label">Or login with</span>
                    <ul className="socials">
                      <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                      <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                      <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
 }