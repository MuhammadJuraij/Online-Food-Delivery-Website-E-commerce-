import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

function FoodItem({ id, name, image, desc, price }) {

  
  const {cartItem,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-img" src={url+'/images/'+image} alt="" />

        {!cartItem[id]
          ? <img onClick={()=>addToCart(id)} className='add' src={assets.add_icon_white} />
          : <div className='food-item-counter' >
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItem[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />

          </div>
        }
      </div>


      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <div className="food-item-desc">{desc}</div>
        <div className="food-item-price">&#8377;{price}</div>
      </div>

    </div>
  )
}

export default FoodItem
