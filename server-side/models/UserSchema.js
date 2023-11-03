import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number , default: 0 },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female"] },
  bloodType: { type: String , default: "" },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", UserSchema , "Users");

