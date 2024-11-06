import { createContext, useEffect, useState,  } from "react"
import axios from 'axios'


export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{

    const url='http://localhost:4000';
    const [cartItem,setCartItem]=useState({})
    const [token,setToken]=useState('');
    const [food_list,setFoodlist]=useState([]);
    const [user,setUser]=useState(null)


// fetch food items 
    const fetchFooditems= async()=>{

        const response=await axios.get(url+'/api/food/list');
        setFoodlist(response.data.data)

    }


    // fetchuser
    const fetchUserData=async(token)=>{
        const response=await axios.post(url+'/api/user/getuserdetails',{},{headers:{token}})
        console.log(response.data)
        setUser(response.data.user)
    }



    const addToCart= async(itemId)=>{
        // if the item is not in cart
        if(!cartItem[itemId]){
            setCartItem(prev=>({...prev,[itemId]:1}))
        }
        else{
            setCartItem(prev=>({...prev ,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }


    
    const removeFromCart=async(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})

        }
    }


    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo=food_list.find((product)=>product._id==item)
                totalAmount+=itemInfo.price*cartItem[item]
            }
        }
        return totalAmount;
    }


  

    const loadCartData=async(token)=>{

        let response=await axios.post(url+'/api/cart/get',{},{headers:{token}})
        setCartItem(response.data.cartData);
    }



    useEffect(()=>{
        async function loadData(){
            await fetchFooditems();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
                await fetchUserData(localStorage.getItem('token'));  
            }
        }
        
        loadData();
    },[])

    
    


    const contextValue={
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        user,
        setUser

    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )



}

export default StoreContextProvider
