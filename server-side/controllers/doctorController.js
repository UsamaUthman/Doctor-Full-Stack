import DoctorSchema from "../models/DoctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";



const updatedDoctor = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const { name, email, password, bloodType, phone, photo } = req.body;
    console.log(req.body);
    try {
      if (user._id.toString() !== id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }
  
      const updateName = name || user.name;
      const updateEmail = email || user.email;
      const updateBloodType = bloodType || user.bloodType;
      const updatePhone = phone || user.phone;
      let updatePassword;
      let updatePhoto;
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updatePassword = hashedPassword;
      }
  
      if (photo) {
        if (user.photo) {
          const photoName = user.photo.split("/")[7].split(".")[0];
          await cloudinary.uploader.destroy(photoName);
        }
        const uploadedResponse = await cloudinary.uploader.upload(photo);
        const photoUrl = uploadedResponse.url;
        updatePhoto = photoUrl;
      }
  
      const updatedUser = await DoctorSchema.findByIdAndUpdate(
        user._id,
        {
          name: updateName,
          email: updateEmail,
          password: updatePassword,
          bloodType: updateBloodType,
          phone: updatePhone,
          photo: updatePhoto,
        },
        { new: true }
      ).select("-password");
  
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
    }
}


const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
  
    try {
      if (user.role !== "Admin") {
        return res.status(401).json({ message: "Not authorized" });
      }
  
      await DoctorSchema.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
    }
}


const getsingleDoctor = async (req, res) => {
    const id = req.params.id;
    const user = req.user;
  
    try {
      // if (user._id.toString() !== id.toString()) {
      //   return res.status(401).json({ message: "Not authorized" });
      // }
  
      const foundUser = await DoctorSchema.findById(id).populate(
        "reviews"
      ).select("-password");
  
      return res.status(200).json(foundUser);
    } catch (error) {
      console.log(error);
    }
}


const getAllDoctors = async (req, res) => {  
    try {
    //   if (user.role !== "Admin") {
    //     return res.status(401).json({ message: "Not authorized" });
    //   }

    const {query} = req.query;
    let doctors;

    if(query){
        doctors = await DoctorSchema.find({
            isApproved: "approved",
            $or: [
              { name: { $regex: query, $options: "i" } },
              { specialization: { $regex: query, $options: "i" } },
            ],
        })
    } else {
        doctors = await DoctorSchema.find({ isApproved: "approved" });
    }
    
      return res.status(200).json(doctors);
    } catch (error) {
      console.log(error);
    }
}

export { updatedDoctor , deleteDoctor , getsingleDoctor , getAllDoctors };