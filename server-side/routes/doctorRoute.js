import express from 'express';
import { updatedDoctor ,
    deleteDoctor ,
    getsingleDoctor ,
    getAllDoctors
 } from '../controllers/doctorController.js';
import { acceptRoles, protect } from '../middleware/protect.js';

import reviewRouter from './reviewRoute.js';


const router = express.Router();

// nested routes
router.use("/reviews", reviewRouter);

router.post("/profile/update/:id" ,  updatedDoctor);
router.delete("/delete/:id" , protect , acceptRoles(["admin"]),  deleteDoctor);
router.get("/doctor/:id" , protect ,  getsingleDoctor);
router.get("/" , protect , acceptRoles(["patient" , "doctor"]),  getAllDoctors);


export default router;