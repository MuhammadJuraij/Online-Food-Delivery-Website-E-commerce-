import React from 'react'
import './FoodDesplay.css'
import { useContext } from 'react'
import {StoreContext} from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

function FoodDesplay({category}) {

    const {food_list}=useContext(StoreContext)
    
  return (
    <div className='food-display'>
      <h2 >Top dishes near you</h2>
      <div className="food-display-list">
        {
            food_list.map((item,index)=>{
              if(category==='All' || category===item.category){
                return  <FoodItem key={index} id={item._id} name={item.name} image={item.image} desc={item.description} price={item.price} />
              }
             
              
        })
        }
      </div>
    </div>
  )
}

export default FoodDesplay
