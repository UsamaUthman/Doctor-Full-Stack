import express from 'express';
import { createReview , getAllReviewsForDoctor , getAllReviews } from '../controllers/reviewController.js';
import { protect , acceptRoles } from '../middleware/protect.js';

const router = express.Router(
    {
        mergeParams: true
    }
);


router.route('/:doctorId/review').get(getAllReviewsForDoctor).post(protect, acceptRoles('patient'), createReview);
router.route('/all').get(getAllReviews);


export default router;