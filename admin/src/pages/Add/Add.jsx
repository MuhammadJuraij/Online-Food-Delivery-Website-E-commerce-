import React, {   useEffect, useState } from 'react' 
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

function Add() {

    const url = 'http://localhost:4000';


    const [image,setImage]=useState(false);

    const [data,setData]=useState({
        name:'',
        description:'', 
        category:'Biriyani',
        price:''
    })

    const handleOnchange=(event)=>{
        const {name,value}=event.target;

        setData((prev)=>{
            return{
                ...prev , [name]:value
            }
        })
    }

    const handleOnsubmit=async(e)=>{
        e.preventDefault()

        const formData=new FormData();
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('category',data.category)
        formData.append('price',data.price)
        formData.append('image',image)
        
        const response= await axios.post(`${url}/api/food/add`,formData)
      
        
        if(response.data.success){
            console.log(data,image);
            
            setData({
                name:'',
                description:'', 
                category:'Salad',
                price:''})

                setImage(false)
                toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }

        
        
    }

   

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={handleOnsubmit}>

            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image)  :assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={handleOnchange} value={data.name} type="text" name="name" placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={handleOnchange} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={handleOnchange} name="category">
                        <option value="Biriyani">Biriyani</option>
                        <option value="Mandi">Mandi</option>
                        <option value="Alfaham">Alfaham</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Shawarma">Shawarma</option>
                        <option value="Burger">Burger</option>
                        <option value="Cake">Cake</option>
                        <option value="Sandwich">Sandwich</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={handleOnchange} value={data.price} type="number" name='price' placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    
    </div>
  )
}

export default Add
