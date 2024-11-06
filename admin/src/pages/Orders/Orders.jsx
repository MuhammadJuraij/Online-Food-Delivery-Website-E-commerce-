import React from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect,useState } from 'react';
import {assets} from '../../assets/assets'



function Orders() {
  const url='http://localhost:4000'

  const [orders,setOrders]=useState([]);



// fetch all order
  const fetchAllOrder=async()=>{

    const response=await axios.get(url+'/api/order/list');
    if(response.data.success){
      setOrders(response.data.data)
      console.log(response.data.data);
    }
    else{
      toast.error('error')
    }
  }

  // update staus
  const handleupdate=async(event,orderId)=>{

   const response=await axios.post(url+'/api/order/status',{orderId:orderId,status:event.target.value})
   if(response.data.success){
    fetchAllOrder();
   }
  }



  useEffect(()=>{
    fetchAllOrder();
  },[])
  
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />

            <div>
               <p className='order-item-food'>
               {order.items.map((item,index)=>{
                if(index===item.length-1){
                  return item.name + ' x'+item.quantity
                }
                else{
                  return item.name + ' x'+item.quantity +' , '
                }

                })}
               </p>
               <p className='order-item-name' >
                {order.address.firstname + ' '+order.address.lastname }
               </p>

               <div className="order-item-address">
                  <p>{order.address.street}</p>
                  <p>{order.address.city+' , '+order.address.state+' , '+order.address.country+' , '+order.address.zipcode}</p>
               </div>

               <div className="order-item-phone">{order.address.phone}</div>
              
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>

            <select onChange={(event)=>handleupdate(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Deliverd">Deliverd</option>

            </select>
            

          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Orders
