import React from 'react'
 import './Navbar.css'
import { assets } from '../../assets/assets'


function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo'>
      <h1>TAWA</h1>
      <p>admin</p>
      </div>
      
      {/* <img className='profile' src={assets.profile_image} alt="" /> */}
    </div>
  )
}

export default Navbar
