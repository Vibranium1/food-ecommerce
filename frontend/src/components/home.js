import React,{useState} from 'react'
import Navbar from "./navbar"
import Footer from "./footer"
import ProductList from "./productlisting"

export default function Home() {
  localStorage.setItem("isAdmin",false)

  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search term

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state
  };
  return (
 
    <div>
        <Navbar/>

        {/* <div id="carouselExampleIndicators container" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" ></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner ">
    <div className="carousel-item active">
    <img className="d-block" style={{width: 1900, height: 700 }} src="https://img.freepik.com/free-photo/stewed-white-beans-sliced-pumpkin-tomato-sauce_2829-19775.jpg?semt=ais_hybrid" alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" style={{width: 1900, height: 700 }} src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=" alt="Second slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="..." alt="Third slide" />
    </div>
  </div>                                                                                                      
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div> */}
<div className="position-relative">
<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <ol className="carousel-indicators">
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img
        className="d-block w-100"
        style={{ width: "100%", height: "700px" }}
        src="https://img.freepik.com/free-photo/stewed-white-beans-sliced-pumpkin-tomato-sauce_2829-19775.jpg?semt=ais_hybrid"
        alt="First slide"
      />
    </div>
    <div className="carousel-item">
      <img
        className="d-block w-100"
        style={{ width: "100%", height: "700px" }}
        src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
        alt="Second slide"
      />
    </div>
    <div className="carousel-item">
      <img
        className="d-block w-100"
        style={{ width: "100%", height: "700px" }}
        src="https://img.freepik.com/premium-photo/malai-paneer-tikka-kabab-is-indian-dish-made-from-chunks-cottage-cheese_466689-67032.jpg?w=740"
        alt="Third slide"
      />
    </div>
  </div>
  <a
    className="carousel-control-prev"
    href="#carouselExampleIndicators"
    role="button"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a
    className="carousel-control-next"
    href="#carouselExampleIndicators"
    role="button"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
 
<div
    className="position-absolute top-50 start-50 translate-middle"
    style={{ zIndex: 10, width: "60%" }}
  >
    <form className="d-flex" role="search" >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        onChange={handleSearchChange} 
        aria-label="Search"
        style={{ height: "50px" }}
      />
      {/* <button className="btn btn-outline-light" type="submit">
        Search
      </button> */}
    </form>
  </div>


</div>


        <ProductList searchTerm={searchTerm}/>
         <Footer />
    </div>
  )
}
