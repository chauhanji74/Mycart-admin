import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import suimg from "../images/signup-image.jpg";

/**
* @author
* @function Signup
**/

export const Signup = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPass] = useState('');

  
  const registerAdmin = async (e) =>{
    e.preventDefault();
    let item = {name, email, phone, password}
    const res = await fetch("/admin/register",{
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(item)
    });

    const data = await res.json();
    if (data.status === 422 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
      
    }else{
      window.alert("Registration successful");
      console.log("Successful Registration");

      navigate("/signin");
    }
  }

  return(
    <Layout>
      <div className="main">
        <section className="signup">
          <div className="container1">
            {/*<div className='text-center' style={{paddingTop: "2rem", borderRadius: ".3rem", color: "violet"}}>
              <h1>Mycart Admin</h1>
            </div>*/}
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form">
                  <div className="form-group">
                    <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"/>
                  </div>
                  <div className="form-group">
                    <label for="email"><i className="zmdi zmdi-email"></i></label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email"/>
                  </div>
                  <div className="form-group">
                    <label for="phone"><i className="zmdi zmdi-account material-icons-name"></i></label>
                    <input type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number"/>
                  </div>
                  <div className="form-group">
                    <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                    <input type="password" name="password" id="pass" value={password} onChange={(e) => setPass(e.target.value)} placeholder="Password"/>
                  </div>
                  <div className="form-group">
                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                    <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                  </div>
                  <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" className="form-submit" onClick={registerAdmin} value="Register" />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure><img src={suimg} alt="sing up image" /></figure>
                <NavLink to="/signin" className="signup-image-link">I am already member</NavLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
   )

 }