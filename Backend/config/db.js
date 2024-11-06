import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://juraij:587245@cluster0.9n9jg.mongodb.net/food-del').then(()=>console.log('DB connected'));
}