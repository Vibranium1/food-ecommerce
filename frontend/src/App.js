import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./components/navbar"
import Home from "./components/home"
import ProductList from "./components/productlisting"
import Login from "./components/login"
import About from "./components/about"
import CreateAdmin from "./components/createadmin"
import Admin from "./components/admin";
import UserSignUp from "./components/usersignup";
import User from "./components/user";

function App() {
  return (
    <>
    
    <Router>
    {/* <Navbar /> */}

      
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/aboutus" element={<About/>} />
          <Route path="/createadmin" element={<CreateAdmin/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/usersignup" element={<UserSignUp/>} />
          <Route path="/user" element={<User/>} />
        </Routes>
    
    </Router>

   
     

    </>
    
  );
}

export default App;
