import React, { useContext, useEffect, version } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate=useNavigate();

  
  const vefityPayment=async(req,res)=>{

    const response=await axios.post(url+'/api/order/verify',{success,orderId})
    if(response.data.success){
      navigate('/myorders')
    }
    else{
      navigate('/')
    }
  }

  useEffect(()=>{
    vefityPayment();
  },[])



  return (
    <div className="verify">
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify;
