import jwt from "jsonwebtoken";
import UserSchema from "../models/UserSchema.js";
import DoctorSchema from "../models/DoctorSchema.js";
import dotenv from "dotenv";

dotenv.config({
    path: './config/.env'
});



const protect = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(401).json({ message: "Unauthorized" });
            } else {
                if(decodedToken.role === "doctor"){
                    const doctor = await DoctorSchema.findById(decodedToken.id);
                    if(!doctor) {
                        return res.status(401).json({ message: "Unauthorized" });
                    }
                    const { password, ...rest } = doctor._doc;
                    req.user = rest;
                    next();
                }else{
                    const user = await UserSchema.findById(decodedToken.id);
                    if(!user) {
                        return res.status(401).json({ message: "Unauthorized" });
                    }
                    const { password, ...rest } = user._doc;
                    req.user = rest;
                    next();
                }

            }
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

const acceptRoles = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "You are not allowed to access this resource" });
        }
        next();
    }
}


export  {protect, acceptRoles};
