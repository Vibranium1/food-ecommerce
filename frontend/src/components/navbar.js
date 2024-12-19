import React,{useState,useEffect} from 'react'
import {
    Link, useNavigate
  } from "react-router-dom";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.setItem("isAdmin",false)
    setIsAuthenticated(false);  
    navigate('/'); 
  };

  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-success">
  <div className="container-fluid text-white">
    <Link className="navbar-brand text-white" to="/">VFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className=" d-flex" >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-white" aria-current="page" to="/aboutus">About Us</Link>
        </li>


        {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            )}


      </ul>

    </div>
  </div>
</nav>
    </div>
  )
}
