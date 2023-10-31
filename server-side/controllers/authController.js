import UserSchema from "../models/UserSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const registerUser = async (req, res, userData) => {
  try {
    const { name, email, password, gender, role, photo } = userData;

    // Check if the user already exists in both User and Doctor collections
    const userExists = await UserSchema.findOne({ email });
    const doctorExists = await DoctorSchema.findOne({ email });

    if (userExists || doctorExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let photoUrl = null;
    if (photo) {
      const uploadedResponse = await cloudinary.uploader.upload(photo);
      photoUrl = uploadedResponse.url;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = null;
    if (role === "patient") {
      newUser = new UserSchema({
        name,
        email,
        password: hashedPassword,
        photo: photoUrl,
        gender,
        role,
      });
    } else if (role === "doctor") {
      newUser = new DoctorSchema({
        name,
        email,
        password: hashedPassword,
        photo: photoUrl,
        gender,
        role,
      });
    }

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  const userData = req.body;
  await registerUser(req, res, userData);
};




const login = async (req, res) => {
  const { email, password } = req.body;

  try{

    let user = null;

    const patient = await UserSchema.findOne({ email });
    const doctor = await DoctorSchema.findOne({ email });

    if(patient){
      user = patient;
    }

    if(doctor){
      user = doctor;
    }

    // check if user exists
    if(!user){
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      // generate token
      generateToken(user._id, user.role, res);
      const { password, role , appointments, ...rest } = user._doc;
      return res.status(200).json(rest);
    }

  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}





const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const cuurentUser = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (decoded.role === "doctor") {
      const doctor = await DoctorSchema.findById(decoded.id).select(
        "-password"
      );
      return res.status(200).json(doctor);
    } else {
      const user = await UserSchema.findById(decoded.id).select("-password");
      return res.status(200).json(user);
    }
  } else {
    return;
  }
};




export { register, login, logout, cuurentUser };
