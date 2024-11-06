
import { log } from "console";
import foodModel from "../models/foodModel.js";

import fs from 'fs';

//Multer handles the file upload part (storing the file in the uploads folder).
//fs.unlink is used to delete the old image file from the server’s file system once the new file is uploaded.
//The two modules work together to manage file operations on the server: Multer saves the file, and fs can manage files later as needed.


//add food item

const addFood= async (req,res)=>{
let image_filename=`${req.file.filename}`
console.log(req.file);
console.log(req.body);


const food=new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
})
try{
    await food.save();
    res.json({success:true,message:"food added"})
}
catch(error){
 res.json({success:false,message:"error"})
}

}
// list food items


const listFood= async(req,res)=>{

    try{
        const foods=await foodModel.find({}).sort({_id:-1})
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error})
    }

}



// list one food

const listOneFood=async(req,res)=>{

    try{
        const food=await foodModel.find({_id:req.params.id});
        res.json({success:true,data:food})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}



// remove food item
const removeFood=async(req,res)=>{

    const id=req.body.id;

    try{
        const food=await foodModel.findById(id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(id)
        res.json({success:true,message:'Food removed'})
    }

    catch(error){
        console.log(error)
        res.json({success:false,message:error})

    }


}


const editFood=async(req,res)=>{

    const {id}=req.params;
    const data=req.body
    console.log(req.body)
    console.log(req.file)

    //here in req.body the data is name,price,and category, 
    //req.file contain the image file
    
    try{
        // check the id is valid
        const food=await foodModel.findById(id)


        if(req.file){
            if(food.image && req.file.filename!==food.image){
                // const oldImagePath = path.join(__dirname, 'uploads', food.image);
                // delete existing image
                fs.unlink(`uploads/${food.image}`,()=>{})
                    // fs.unlink(oldImagePath,()=>{})
                
            }
            data.image=req.file.filename;
        }
       
        await foodModel.findByIdAndUpdate(id,data,{ new: true });
        res.json({success:true,message:'updated'})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:'error'})
    }
}





export {addFood,listFood,removeFood,listOneFood,editFood}