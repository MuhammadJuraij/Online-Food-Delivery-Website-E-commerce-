import React, { useState,useEffect, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify'


function LoginPopup({ showLogin,setShowLogin }) {


  const {url,setToken} =useContext(StoreContext);
  const [currentState, setCurrentState] = useState('Login')
  const [data,setData]=useState({
    name:'',
    email:'',
    password:''
  })

  const handleOnChange=(event)=>{

    const {name,value}=event.target;
    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })

  }

  const handleOnSubmit= async(event)=>{
    event.preventDefault();
     let newUrl=url;
    if(currentState==='Login'){
      newUrl+='/api/user/login'
    }
    else{
      newUrl+='/api/user/register'
    }

    const response=await axios.post(newUrl,data)
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
      window.location.reload()
    }
    else{
      toast.error(response.data.message);
    }
    
  }


// to remove the scrollbar
  useEffect(() => {
    if (showLogin) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Clean up on component unmount
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showLogin]);

  
  return (
    <div className='login-popup'>
      <form onSubmit={handleOnSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
        </div>
        
        <div className="login-pops-inputs">
          {currentState === 'Login' ? <></> : <input type="text" name='name' value={data.name} onChange={handleOnChange} placeholder='Enter your name' required />}
          <input type="email" name='email' value={data.email} onChange={handleOnChange} placeholder='Enter your email' required />
          <input type="password" name='password' value={data.password} onChange={handleOnChange} placeholder='Enter the password' required />
        </div>
        <button type='submit'>{currentState === 'Sign up' ? 'Create account' : 'Login'}</button>
       
        
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
          {
            currentState === 'Sign up'
              ? <p>Already have an account?  <span onClick={() => setCurrentState('Login')}>Login here</span></p>
              : <p>Create a new account.   <span onClick={() => setCurrentState('Sign up')}>Click here</span></p>
          }
       

      </form>
    </div>
  )
}

export default LoginPopup
