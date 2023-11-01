import jwt from "jsonwebtoken";
import UserSchema from "../models/UserSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import VerifiedSchema from "../models/VerifiedSchema.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/.env",
});

const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        if (decodedToken.role === "doctor") {
          const doctor = await DoctorSchema.findById(decodedToken.id);
          if (!doctor) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          const { password, ...rest } = doctor._doc;
          req.user = rest;
          next();
        } else {
          const user = await UserSchema.findById(decodedToken.id);
          if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          const { password, ...rest } = user._doc;
          req.user = rest;
          next();
        }
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const acceptRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this resource" });
    }
    next();
  };
};

const protectOtp = async (req, res, next) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Please provide email" });
  }
  try {
    let user;

    const patient = await UserSchema.findOne({ email });
    const doctor = await DoctorSchema.findOne({ email });

    if (patient) {
      user = patient;
    }

    if (doctor) {
      user = doctor;
    }

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...rest } = user._doc;

    req.user = rest;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkToken = async (req, res, next) => {
  const { token } = req.params;

  // const {otp} = req.params;  // mybe i will use it later

  if (!token) {
    return res.status(400).json({ message: "Please provide a token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userSchema = decoded.role === "patient" ? UserSchema : DoctorSchema;
    const user = await userSchema.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const { password, ...rest } = user._doc;

    req.user = rest;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export { protect, acceptRoles, protectOtp, checkToken };
