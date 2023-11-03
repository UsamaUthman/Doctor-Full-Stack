import express from "express";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import userRoute from "./routes/userRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import forgotRoute from "./routes/forgotRoute.js";
import emailRoute from "./routes/contactRoute.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// Load env variables
env.config({
  path: "./config/.env",
});
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Body parser
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cors
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/forgot", forgotRoute);
app.use("/api/v1/contact", emailRoute);

app.get("/", (req, res) => {
  res.send("Hello from Api server");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
