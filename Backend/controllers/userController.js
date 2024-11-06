import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";



const createToken = (userId) => {
    return jwt.sign({ id:userId }, process.env.JWT_SECRET);
  };


// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check the email for user is exist
    const user = await userModel.findOne({email});
    if (!user) {
      res.json({ success: false, message: "User not found" });
    }

    // check the passwords
    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
      res.json({ success: false, message: "invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } 

  catch (error) {
    console.log(error)
    res.json({success:false,message:'error'})
  }
};


  

// registerUser
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check user exist
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    // validate email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // save the user
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// get userdetails

const getUserDetails=async (req,res)=>{
const userId=req.body.userId;


try{
  if(!userId){
    res.json({message:'user not found'})
  }

  const user=await userModel.findOne({_id:userId})
  if(user){
    res.json({success:true,user:user})
  }
}
catch(error){
  console.log(error)
  res.json({success:false,message:'error'})
}


}

// update user

const updateUserDetails=async(req,res)=>{

  const id=req.body.id
  const name=req.body.name;
  const newEmail=req.body.newEmail;
  const oldPassword=req.body.oldPassword;
  const newPassword=req.body.newPassword;
  

  try{

    // check the user is valid
    const user=await userModel.findById(id)
    if(!user){
     return res.json({success:false,message:'user not found'})
    }

    // check the name
    if(name && name!==user.name){
      user.name=name
    }

    // check the email
    if(newEmail && newEmail!==user.email){
      if (!validator.isEmail(newEmail)) {
        return res.json({ success: false, message: "Please enter valid email" });
      }
      const exist=await userModel.findOne({email:newEmail})
      if(exist){
        return res.json({success:false,message:'email already exist'})
      }
      user.email=newEmail;
    }

    // set password
    if(oldPassword&&newPassword){
      const isMatch=await bcrypt.compare(oldPassword,user.password);
      if(!isMatch){
        return res.json({success:false,message:'invalid password'})
      }
      if(newPassword.length<8){
        return res.json({success:false,message:'write strong password'})
      }

      // hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password=hashedPassword;
    }

    await user.save();
    return res.json({success:true,message:'user update successfully'})

  }
  catch(error){
    console.log(error)
    res.json({success:false,message:'internal server error'})
  }
}

export { loginUser, registerUser ,getUserDetails,updateUserDetails};
