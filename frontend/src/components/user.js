import React from 'react'
import Navbar from "./navbar"
import Footer from "./footer";
import Products from "./productlisting"

export default function User() {
  return (
    <div>
      <Navbar/>
      <Products/>
      <Footer/>
    </div>
  )
}
