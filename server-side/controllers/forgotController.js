import nodemailer from "nodemailer";
import UserSchema from "../models/UserSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import OtpGenerator from "otp-generator";
import dotenv from "dotenv";

dotenv.config({
  path: "./config/.env",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // your email address to send email from
    pass: process.env.PASSWORD, // your gmail account password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmailWithOtp = (email, OTP, callback) => {
  const mailOptions = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Reset Password",
    text: `Your OTP is ${OTP}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error);
    } else {
      callback(null, info.response);
    }
  });
};

const generateOtp = async (req, res) => {
  const otp = await OtpGenerator.generate(6, {
    alphabets: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    upperCase: false,
    specialChars: false,
  });
  // Set an expiration time (e.g., 5 minutes from now)
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 1); // 1 minute from now

  // Store the OTP and expiration time in the app.locals
  req.app.locals.OTP = otp;
  req.app.locals.expirationTime = expirationTime;
  sendEmailWithOtp(req.query.email, req.app.locals.OTP, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });

  res.status(200).send({
    success: true,
  });
};

const verifyOtp = async (req, res) => {
  const { code } = req.query;


  if (parseInt(code) === parseInt(req.app.locals.OTP) && req.app.locals.OTP
    && new Date() < req.app.locals.expirationTime) {
    req.app.locals.OTP = null;
    req.app.locals.expirationTime = null;
    req.app.locals.resetSession = true;
    res.status(200).send({
      success: true,
      message: "OTP verified",
    });
  } else {
    res.status(400).send({
      success: false,
      message: "OTP not verified",
    });
  }
};

const creatSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    res.status(201).send({
      flag: req.app.locals.resetSession,
    });
  } else {
    res.status(400).send({
      success: false,
      message: "Session Expired",
    });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { email, role } = req.user;

  try {
    if (!req.app.locals.resetSession) {
      console.log("session expired");
      return res.status(400).json({ message: "Session expired" });
    }
    if (!password) {
      return res.status(400).json({ message: "Please provide password" });
    }
    // check if user exists
    let user;
    if (role === "patient") {
      user = await UserSchema.findOne({ email });
    }

    if (role === "doctor") {
      user = await DoctorSchema.findOne({ email });
    }

    // if user does not exist
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // if user exists
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update password
    user.password = hashedPassword;
    await user.save();

    // put resetSession to false to avoid multiple password updates
    req.app.locals.resetSession = false;

    // send response
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { generateOtp, verifyOtp, creatSession, resetPassword };
