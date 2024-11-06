import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // clear the usercart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // create payment link using the stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges", // This is the name of the additional charge.
        },
        unit_amount: 40 * 100 , // This calculates the amount for the delivery charge.
      },
      quantity: 1, // Only one delivery charge applies, hence quantity is 1.
    });

    // create session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};


// verify the userpayment is successfull or not, if the payment is succesful the payment =true
const verify = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};



const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};



// list all orders for admin
const listOrders=async(req,res)=>{
  try{
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
  }
  catch(error){
    console.log(error)
    res.json({success:false,message:'error'})
  }
}


// api for updating order status

const updateStatus=async(req,res)=>{

  try{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:'status updated'})
  }
  catch(error){
    res.json({success:false,message:'error'})
  }
}


export { placeOrder, verify, userOrders ,listOrders,updateStatus};
