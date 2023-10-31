import express from 'express';
import {protect, acceptRoles} from '../middleware/protect.js';
import {  updatedUser, deleteUser, getsingleUser, getAllUsers , getMyAppointments } from '../controllers/userController.js';


const router = express.Router();


router.post("/profile/update/:id", protect  ,  updatedUser);
router.delete("/delete/:id",  deleteUser);
router.get("/profile/:id",  getsingleUser);
router.get("/" , protect , acceptRoles(["admin"]) ,  getAllUsers);
router.get("/appoinments/my-appoinments" , protect , acceptRoles(["patient"]) , getMyAppointments  );



export default router;
