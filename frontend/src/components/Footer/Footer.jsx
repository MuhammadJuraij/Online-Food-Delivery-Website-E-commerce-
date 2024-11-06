import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

function Footer() {
    return (
        <div className='footer' id='footer'>

            <div className="footer-content">
                <div className="footer-content-left">
                    <h1 className='logo'>Tawa</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nobis quam quidem illo, omnis magni sunt quas, atque recusandae qui consectetur? Harum fuga quasi vel hic, excepturi facilis vero omnis?</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 933567825</li>
                        <li>contact@tawa.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 @ Tawa.com -All Right Reserved.</p>
        </div>
    )
}

export default Footer
