import Apartment from '../models/apartmentModel.js';
import asyncHandler from 'express-async-handler';


// @desc    Get apartment
// @route   GET /api/users/apartment
// @access  Public
export const getApartment = asyncHandler(async (req, res) => {
    const apartment = await Apartment.find({});

    res.json(apartment);
});
