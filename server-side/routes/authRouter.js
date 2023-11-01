import express from 'express';
import { register, login ,logout, cuurentUser , verifyPatientEmail, verifyDoctorEmail } from '../controllers/authController.js';
import { checkToken } from '../middleware/protect.js';

const router = express.Router();

// Route handler for verification
const verifyUser = async (req, res) => {
    const { role } = req.user;
    // if there is role === admin // admin role is not needed to be verified
    if (role === "patient") {
      verifyPatientEmail(req, res);
    } else if (role === "doctor") {
      verifyDoctorEmail(req, res);
    } else {
      res.status(400).json({ message: "Invalid user role" });
    }
  };

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get("/currentUser", cuurentUser);
router.get("/verifyEmail/:token/:otp", checkToken , verifyUser);


export default router;