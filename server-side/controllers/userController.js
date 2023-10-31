import UserSchema from "../models/UserSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import BookingSchema from "../models/BookingSchema.js";

const updatedUser = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const { name, email, password, bloodType, phone, photo } = req.body;
  console.log(user);
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
    let updatedUser;
    if(req.user.role === "doctor"){
        updatedUser = await DoctorSchema.findByIdAndUpdate(
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
    }else{
        updatedUser = await UserSchema.findByIdAndUpdate(
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
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    if (user._id.toString() !== id.toString() || user.role !== "Admin") {
      return res.status(401).json({ message: "Not authorized" });
    }

    await UserSchema.findByIdAndDelete(user._id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getsingleUser = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  try {
    if (user._id.toString() !== id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const foundUser = await UserSchema.findById(id).select("-password");

    return res.status(200).json(foundUser);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    //   if (user.role !== "Admin") {
    //     return res.status(401).json({ message: "Not authorized" });
    //   }

    const users = await UserSchema.find().select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const bookings = await BookingSchema.find({ user: req.user._id });

    const doctorIds = bookings.map((booking) => booking.doctor);

    const doctors = await DoctorSchema.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Your appointments",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

export { updatedUser, deleteUser, getsingleUser, getAllUsers , getMyAppointments };
