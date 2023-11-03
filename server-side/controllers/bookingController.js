import BookingSchema from "../models/BookingSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import UserSchema from "../models/UserSchema.js";

const createAppointment = async (req, res) => {
  const { doctorId, ticketPrice } = req.body;
  let { appointmentDate } = req.body;
  // set appointment date to 1 hour later
  appointmentDate = new Date();
  const user = req.user;

  try {
    const newBooking = new BookingSchema({
      doctor: doctorId,
      user: user._id,
      ticketPrice,
      appointmentDate,
    });

    const savedBooking = await newBooking.save();

    //seved booking in doctor and user
    await DoctorSchema.findByIdAndUpdate(
      doctorId,
      {
        $push: { appointments: savedBooking._id },
      },
      { new: true }
    );

    await UserSchema.findByIdAndUpdate(
      user._id,
      {
        $push: { appointments: savedBooking._id },
      },
      { new: true }
    );

    return res.status(200).json(savedBooking);
  } catch (error) {
    console.log(error);
  }
};

const deleteAppointment = async (req, res) => {

}

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
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

export { createAppointment, getMyAppointments , deleteAppointment };
