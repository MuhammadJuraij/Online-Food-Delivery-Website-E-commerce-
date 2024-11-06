import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder(setShowLogin) {

  const {getTotalCartAmount,token,food_list,cartItem,url} = useContext(StoreContext)


  // store information about form field
  const [data,setData]=useState({
    firstname:"",
    lastname:'',
    email:"",
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onchangeHandler=(event)=>{
    const {name,value}=event.target;

    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }


  
  const placeOrder=async(event)=>{
    event.preventDefault();

    let orderItems=[];
    food_list.map((item)=>{
      if(cartItem[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItem[item._id];
        orderItems.push(itemInfo)  
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+40,
    }

    let response= await axios.post(url+'/api/order/place',orderData,{headers:{token}})
    if(response.data.success){
      const{session_url}=response.data;
      window.location.replace(session_url)
    }
    else{
      alert("Error");
    }
  }


  return (
    <div>

      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <div className="right-title">
            <p>Delivery Information</p>
          </div>
          <div className='multifields'>
            <input name='firstname' onChange={onchangeHandler} value={data.firstname} required type="text" placeholder='Firstname' />
            <input name='lastname' onChange={onchangeHandler} value={data.lastname} required type="text" placeholder='Lastname' />
          </div>
          <div>
            <input type="email" name='email' onChange={onchangeHandler} value={data.email} required placeholder='Email address' />
            <input type="text" name='street' onChange={onchangeHandler} value={data.street} required placeholder='Street' />
          </div>
          <div className='multifields'>
            <input type="text" name='city' onChange={onchangeHandler} value={data.city} required placeholder='City' />
            <input type="text" name='state' onChange={onchangeHandler} value={data.state} required placeholder='State' />
          </div>
          <div className='multifields'>
            <input type="text" name='zipcode' onChange={onchangeHandler} value={data.zipcode} required placeholder='Zipcode' />
            <input type="text" name='country' onChange={onchangeHandler} value={data.country} required placeholder='Country' />
          </div>
          <div>
            <input type="text" name='phone' onChange={onchangeHandler} value={data.phone} required placeholder='phone' />
          </div>
        </div>


        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className='cart-total-detail'>
            <p>Subtotal</p>
            <p>&#8377;{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-detail">
            <p>Delovery Fee</p>
            <p>&#8377;{getTotalCartAmount()==0?0:40}</p>
          </div>
          <hr />
          <div className="cart-total-detail">
            <b>Total</b>
            <b>&#8377;{getTotalCartAmount()+40}</b>
          </div>
          

          <button type='submit' >PROCEED TO PAYMENT</button>
        </div>
        </div>



      </form>

    </div>
  )
}

export default PlaceOrder
