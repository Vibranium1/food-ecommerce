import React, { useState } from 'react'
import Navbar from "./navbar"
import {

  Link
} from "react-router-dom";
import {jwtDecode} from "jwt-decode";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const Submit =async (e)=>{
      e.preventDefault();
      if(!email|| !password){
        alert("email or password missing");
        return
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
    
        const result = await response.json();
    
        if (response.ok) {
          alert("Login successful!");
          localStorage.setItem("token", result.token); 

          const decodedToken = jwtDecode(result.token);
        if (decodedToken.role === "admin") {
          window.location.href = "/admin"; 
          localStorage.setItem("isAdmin",true)                  // Redirect to admin page if role is admin
        } else {
          window.location.href = "/user"; // Redirect to user page if role is user
          localStorage.setItem("isAdmin",false)   
        }
          // window.location.href = "/admin";
        } else {
          alert(result.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Server error. Please try again later.");
      }

  }

  return (

    <>
     
    <Navbar />
    <div className='mt-5 container'>
      <form onSubmit={Submit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}
    placeholder='Enter email address'
    aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password"
    placeholder='Enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
  </div>
  <div className='d-flex justify-content-between'><button type="submit" className="btn btn-primary">Submit</button> 
  <Link className='' to="/usersignup">Signup as User</Link>
  <Link className='' to="/createadmin">Create Admin</Link></div>
  
</form>


    </div>
    </>
  )
}
