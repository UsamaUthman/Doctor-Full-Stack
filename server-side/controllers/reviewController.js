import Review from '../models/ReviewSchema.js';
import DoctorSchema from '../models/DoctorSchema.js';


// get all reviews for a doctor
const getAllReviewsForDoctor = async (req, res) => {
    const doctorId = req.params.doctorId;
    try {
        const reviews = await Review.find({
            doctor: doctorId
        }).sort({
            createdAt: -1
        });
        res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: {
                reviews
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};
// get all reviews 
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: {
                reviews
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};


// create review
const createReview = async (req, res) => {

    if(!req.body.doctor) req.body.doctor = req.params.doctorId;
    if(!req.body.user) req.body.user = req.user._id;

    if(req.body.rating > 5 || req.body.rating < 1){
        req.body.rating = 0;
    }
    const newReview = await Review(req.body);
    try {

        const savedReview = await newReview.save();

        await DoctorSchema.findByIdAndUpdate(req.params.doctorId, {
            $push: {
                reviews: savedReview._id
            }
        }, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: 'success',
            data: {
                review: savedReview
            }
        });
       
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};


export {
    getAllReviewsForDoctor,
    getAllReviews,
    createReview
};