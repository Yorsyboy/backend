import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';


// @desc    Get apartment
// @route   GET /api/users/apartment
// @access  Public
export const getReview = asyncHandler(async (req, res) => {
    const review = await Review.find({});

    res.json(review);
});
