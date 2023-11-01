import UserSchema from "../models/UserSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import VerifyScheme from "../models/VerifiedSchema.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import OtpGenerator from "otp-generator";

import { v2 as cloudinary } from "cloudinary";

import nodemailer from "nodemailer";
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

const sendEmailFunction = (email, subject, token, otp, callback) => {
  const mailOptions = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: subject,
    html: `hello you can verify your account by clicking on this link <a href="http://localhost:3000/verified-email/${token}/${otp}">verify</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error);
    } else {
      callback(null, info.response);
      console.log(info.response);
    }
  });
};

const registerUser = async (req, res, userData, createNewUser) => {
  try {
    const { name, email, password, gender, role, photo } = userData;

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

    const newUser = createNewUser({
      name,
      email,
      password: hashedPassword,
      photo: photoUrl,
      gender,
      role,
    });

    let otp = OtpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });

    const token = jwt.sign(
      { otp, role, id: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d", // 1 day
      }
    );

    const verifiedEmail = new VerifyScheme({
      email,
      otp,
      expirationTime: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
      role,
    });

    await verifiedEmail.save();
    await newUser.save();

    sendEmailFunction(
      email,
      "verify your account",
      token,
      otp,
      (error, response) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Email sending failed" });
        } else {
          return res.status(200).json({ message: "Email sent successfully" });
        }
      }
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error from register" });
  }
};

const register = async (req, res) => {
  const userData = req.body;
  
  if (userData.role === 'patient') {
    registerUser(req, res, userData, (userFields) => new UserSchema(userFields));
  } else if (userData.role === 'doctor') {
    registerUser(req, res, userData, (userFields) => new DoctorSchema(userFields));
  } else {
    res.status(400).json({ message: "Invalid user role" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;

    const patient = await UserSchema.findOne({ email });
    const doctor = await DoctorSchema.findOne({ email });

    if (patient) {
      user = patient;
    }

    if (doctor) {
      user = doctor;
    }

    // check if user exists
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "User is not verified" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      // generate token
      generateToken(user._id, user.role, res);
      const { password, role, appointments, ...rest } = user._doc;
      return res.status(200).json(rest);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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

const verifyUserEmail = async (req, res, userRole) => {
  const user = req.user;
  const { otp } = req.params;

  try {
    // acctually we dont this because we already have the user in req.user from protect.js middleware (but i will keep it for now)
    const userModel = userRole === 'patient' ? UserSchema : DoctorSchema; // if userRole === 'patient' then userModel = UserSchema else userModel = DoctorSchema
    const userField = userRole === 'patient' ? 'patient' : 'doctor';

    const userRecord = await userModel.findOne({ email: user.email });

    if (!userRecord) {
      return res.status(404).json({ message: "User not found" });
    }
    // we can use this instead of the above code
    const pendingEmailVerification = await VerifyScheme.findOne({ email: user.email }); // to check if the user has a pending email verification in the database

    if (!pendingEmailVerification) {
      return res.status(400).json({ message: "Email not found or already verified" }); // if the user has no pending email verification in the database 
    }

    if (pendingEmailVerification.expirationTime < Date.now()) { // if the user has a pending email verification in the database but the time of the verification has expired
      await userModel.findOneAndDelete({ email: user.email }); // delete the user from the database if the time of the verification has expired
      await VerifyScheme.findOneAndDelete({ email: user.email }); // delete also the pending email verification from the database if the time of the verification has expired
      return res.status(400).json({ message: "Link expired, please register again" });
    }

    if (userRecord.isVerified) {
      return res.status(400).json({ message: `${userField} is already verified` }); // we can delete this beacause we already have a check for this in the protect.js middleware
    }

    if (pendingEmailVerification.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" }); // we can delete that also but i put it for more security if any body has the link and the token but he dont have the otp
    }

    userRecord.isVerified = true; // finally if the user has a pending email verification in the database and the time of the verification has not expired and the otp is correct then we will verify the user
    await userRecord.save(); //save the user in the database
    await VerifyScheme.findOneAndDelete({ email: user.email }); // delete it from the pending email verification database

    return res.status(200).json({ message: `${userField} verified successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyPatientEmail = (req, res) => {
  verifyUserEmail(req, res, 'patient');
};

const verifyDoctorEmail = (req, res) => {
  verifyUserEmail(req, res, 'doctor');
};


export { register, login, logout, cuurentUser, verifyPatientEmail, verifyDoctorEmail };
