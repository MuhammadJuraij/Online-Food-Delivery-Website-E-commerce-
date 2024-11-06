import React, { useEffect, useState } from 'react'
import './Edit.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


function Edit() {

    const {id}=useParams()
    const url='https://food-delivery-app-backend-omd9.onrender.com';
    const[image,setImage]=useState(false)

    const navigate=useNavigate();
    const[data,setData]=useState({
        name:'',
        description:'',
        category:'',
        price:''
    })


    const fetchdata=async()=>{

        const response=await axios.get(url+`/api/food/list/${id}`)
        
        if(response.data.success){
            let fetchdata=response.data.data[0];
            setData(fetchdata)
            setImage(fetchdata.image)
        }   
    }

    const HandleOnChange=(event)=>{

        const {name,value}=event.target;
        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
        
    }

    const HandleOnSubmit=async(e)=>{
        e.preventDefault();
        
        const formData=new FormData();
        formData.append('name',data.name)
        formData.append('description',data.description)
        formData.append('category',data.category)
        formData.append('price',data.price)
        formData.append('image',image)

        const response = await axios.put(`${url}/api/food/edit/${id}`, formData)
            
   

        if(response.data.success){
            console.log(data,image);
            navigate('/')
            toast.success(response.data.message)
        }
        else{
        toast.error(response.data.message)
        }


    }





    useEffect(()=>{
        fetchdata();
    },[id])

    useEffect(()=>{
        console.log(data);
        console.log(image)
        
    },[image])
    


  return (
    <div className='add'>
        <form onSubmit={HandleOnSubmit} className='flex-col' >

            {/* image */}
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src= {image instanceof File ?URL.createObjectURL(image):`${url}/images/${image}`} alt="" />
                </label>
                <input  onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden  />
            </div>
            {/* name */}
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input value={data.name} onChange={HandleOnChange} type="text" name="name" placeholder='Type here' />
            </div>

            {/* desc */}

            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea  value={data.description} onChange={HandleOnChange} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select  name="category" value={data.category} onChange={HandleOnChange}>
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
                    <input value={data.price} onChange={HandleOnChange} type="number" name='price' placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    
    </div>
  )
}

export default Edit
