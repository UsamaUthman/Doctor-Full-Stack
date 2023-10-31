import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config({
  path: "./config/.env",
});


const generateToken = (id, role, res) => {
  const token = jwt.sign({ id , role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  res.cookie("jwt", token, {
    httpOnly: true, // more secure and prevent XSS
    secure : false, // only https
    sameSite: "strict", // CSRF protection
    maxAge: 1000 * 60 * 60 * 6, // 6 hours
  });
  return token;
};

export default generateToken;
