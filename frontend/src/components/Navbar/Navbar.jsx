import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

function Navbar({ setShowLogin }) {
    const [menu, setMenu] = useState('home');
    const { getTotalCartAmount, token, setToken, user } = useContext(StoreContext);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                { id: 'home', offset: 0 },
                { id: 'explore-menu', offset: document.getElementById('explore-menu').offsetTop },
                { id: 'app-download', offset: document.getElementById('app-download').offsetTop },
                { id: 'footer', offset: document.getElementById('footer').offsetTop },
            ];

            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            for (let i = sections.length - 1; i >= 0; i--) {
                if (scrollPosition >= sections[i].offset) {
                    setMenu(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='navbar'>
            <div>
                <Link to='/'><h1 className='logo'>Tawa</h1></Link>
            </div>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu('explore-menu')} className={menu === 'explore-menu' ? 'active' : ''}>Menu</a>
                <a href='#app-download' onClick={() => setMenu('app-download')} className={menu === 'app-download' ? 'active' : ''}>Mobile-App</a>
                <a href='#footer' onClick={() => setMenu('footer')} className={menu === 'footer' ? 'active' : ''}>Contact Us</a>
            </ul>

            <div className='navbar-right'>
                <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>

                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate('/userdetails')}><img src={assets.pp} alt="" />{user ? user.name : ''}</li>
                            <hr />
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
                            <hr />
                            <li onClick={logOut}><img src={assets.logout_icon} alt="" />Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
