import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

function Cart({setShowLogin}) {

  const { food_list, cartItem, removeFromCart,getTotalCartAmount,url,token } = useContext(StoreContext)

  const navigate=useNavigate();

  const checkState=()=>{
    if(!token){
      setShowLogin(true)
    }
    else if(getTotalCartAmount()==0){
      navigate('/cart')
    }
    else{
      navigate('/placeorder')
    }
  }


  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <div>

                  <div className='cart-items-title cart-items-item'>
                    <img src={url+'/images/'+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>&#8377;{item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>&#8377;{item.price * cartItem[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }

      </div>

      <div className="cart-bottom">
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
            <b>&#8377;{getTotalCartAmount()==0?0:getTotalCartAmount()+40}</b>
          </div>
          

          <button onClick={checkState}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart