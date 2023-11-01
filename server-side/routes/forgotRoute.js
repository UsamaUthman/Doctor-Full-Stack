import express from 'express';
import localVariables from '../middleware/localVariables.js';
import {protect , protectOtp} from '../middleware/protect.js';
import  {generateOtp , verifyOtp , creatSession , resetPassword } from '../controllers/forgotController.js';


const router = express.Router();



// Import controllers

// generate otp
router.post('/generate-otp', protectOtp , localVariables, generateOtp);

// verify otp
router.post('/verify-otp' , protectOtp , verifyOtp);

// create session
router.get('/create-session' , creatSession);

// reset password
router.post('/reset-password' , protectOtp,  resetPassword);



export default router;