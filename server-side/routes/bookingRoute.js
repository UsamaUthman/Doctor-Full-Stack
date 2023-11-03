import express from "express";

import { protect, acceptRoles } from "../middleware/protect.js";

import {
  createAppointment,
  getMyAppointments,
  deleteAppointment,
} from "../controllers/bookingController.js";


const router = express.Router({
    mergeParams: true,
});

router.post("/appoinments/create" , protect , acceptRoles(["patient"]) , createAppointment);
router.delete("/appoinments/delete/:id" , protect , acceptRoles(["patient" , "admin"]) , deleteAppointment);
router.get("/appoinments/my-appoinments" , protect , acceptRoles(["patient"]) , getMyAppointments  );


export default router;