import mongoose from 'mongoose';


const verifiedEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: Number,
        required: true,
        unique: true,
    },
    expirationTime: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});


export default mongoose.model('VerifiedEmail', verifiedEmailSchema, 'VerifiedEmail');