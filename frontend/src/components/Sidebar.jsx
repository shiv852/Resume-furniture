
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import "./Sidebar.css"
import { Link } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";

const Sidebar = () => {
   
  const [nav , setNav]=useState(false)
  const handleNav =() => setNav(!nav)
  
      
    
  return (
    <div className='z-50 '>
 
          <div className="humburger md:hidden  cursor-pointer" onClick={handleNav}>
          {!nav ? <RxHamburgerMenu className='text-white' size={25} /> : <IoCloseOutline style={{color:"#000"}}  size={29}/>}   
          </div>
          {/* rgb(17 24 39 / 54%) rgb(5 9 16 / 88%) */}
        <div  className={nav ? 'mobile-menu active' :'mobile-menu'}style={{backgroundColor:"rgb(203 216 240 / 88%) "}} >
        <ul className='mobile-nav ' >
         <Link to="/"  className='no-underline text-black'><li >Home</li></Link> 
         <Link to="/product" className='no-underline text-black'><li  >Product</li></Link> 
         <Link to="/content" className='no-underline  text-black'><li>Contact</li></Link> 
        </ul>
        <div className='mobile-menu-bottom '>
              <div className="menu-icons flex flex-row justify-center items-center gap-5  ">
                 {/* <input type="text" /> */}
                 <FaFacebook size={37}/><FaWhatsapp size={40}/><SlSocialInstagram size={33}/>
              </div>
        </div>
        </div>
    </div>
  )
}

export default Sidebar
