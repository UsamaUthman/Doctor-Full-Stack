import express from 'express';
import {protect, acceptRoles} from '../middleware/protect.js';
import {  updatedUser, deleteUser, getsingleUser, getAllUsers , getMyAppointments , createAppointment} from '../controllers/userController.js';
import bookingRoute from './bookingRoute.js';

const router = express.Router();

// nested routes
router.use('/', bookingRoute);

router.post("/profile/update/:id", protect  ,  updatedUser);
router.delete("/delete/:id",  deleteUser);
router.get("/profile/:id",  getsingleUser);
router.get("/" , protect , acceptRoles(["admin"]) ,  getAllUsers);
// router.post("/appoinments/create" , protect , acceptRoles(["patient"]) , createAppointment);
// router.get("/appoinments/my-appoinments" , protect , acceptRoles(["patient"]) , getMyAppointments  );



export default router;
