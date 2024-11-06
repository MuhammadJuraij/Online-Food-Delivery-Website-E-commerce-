
import express from 'express';
import multer from 'multer'
import { addFood, editFood, listFood ,listOneFood,removeFood} from '../controllers/foodController.js';

const foodRouter=express.Router()

// image storage engine
const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()} ${file.originalname}`)
    }
})

const upload =multer({storage:storage})


// set route
foodRouter.post('/add', upload.single('image'),addFood)
foodRouter.get('/list',listFood)
foodRouter.get('/list/:id',listOneFood)
foodRouter.post('/remove',removeFood)
foodRouter.put('/edit/:id',upload.single('image'),editFood)


export default foodRouter