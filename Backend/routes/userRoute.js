import express from 'express';
import { getUserDetails, loginUser,registerUser,updateUserDetails } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter=express.Router();


userRouter.post('/login',loginUser);
userRouter.post('/register',registerUser)
userRouter.post('/getuserdetails',authMiddleware,getUserDetails)
userRouter.post('/updateUserDetails',updateUserDetails)

export default userRouter;