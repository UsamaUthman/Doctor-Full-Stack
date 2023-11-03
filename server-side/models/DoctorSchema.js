import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number, default: 0 },
  photo: { type: String },
  bloodType: { type: String, default: "" },
  ticketPrice: { type: Number, default: 50 },
  role: {
    type: String,
  },

  // Fields for doctors only
  specialization: { type: String, default: "general" },
  qualifications: {
    type: Array,
  },
  hospital: { type: String, default: "Mount Adora Hospital, Sylhet." },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: {
    type: Array,
    default: [
      // put default like tthree days in a week and aviailable hours
      {
        day: "Monday",
        slots: [
          { startTime: "09:00", endTime: "10:00" },
          { startTime: "10:00", endTime: "11:00" },
          { startTime: "11:00", endTime: "12:00" },
          { startTime: "12:00", endTime: "13:00" },
          { startTime: "13:00", endTime: "14:00" },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { startTime: "09:00", endTime: "10:00" },
          { startTime: "10:00", endTime: "11:00" },
          { startTime: "11:00", endTime: "12:00" },
          { startTime: "12:00", endTime: "13:00" },
          { startTime: "13:00", endTime: "14:00" },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { startTime: "09:00", endTime: "10:00" },
          { startTime: "10:00", endTime: "11:00" },
        ],
      },
    ]
  },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Doctor", DoctorSchema, "Doctor");
