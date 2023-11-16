
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import Form from '../models/formModel.js';


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const form = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, phone, photo, checkIn, checkOut, apartmentName, guests, amount } = req.body;

    if (!firstName || !lastName || !email || !phone || !photo || !checkIn || !checkOut || !apartmentName || !guests || !amount) {
        res.status(400);

        if (!firstName) {
            res.status(400);
            throw new Error('First name is required');
        }

        if (!lastName) {
            res.status(400);
            throw new Error('Last name is required');
        }

        if (!email) {
            res.status(400);
            throw new Error('Email is required');
        }

        if (!phone) {
            res.status(400);
            throw new Error('Phone is required');
        }

        if (!photo) {
            res.status(400);
            throw new Error('Photo is required');
        }

        if (!checkIn) {
            res.status(400);
            throw new Error('Check-in date is required');
        }

        if (!checkOut) {
            res.status(400);
            throw new Error('Check-out date is required');
        }

        if (!apartmentName) {
            res.status(400);
            throw new Error('Apartment name is required');
        }

        if (!guests) {
            res.status(400);
            throw new Error('Number of guests is required');
        }

        if (!amount) {
            res.status(400);
            throw new Error('Amount is required');
        }

    }

    // Create form
    const form = await Form.create({
        firstName,
        lastName,
        email,
        phone,
        photo,
        checkIn,
        checkOut,
        apartmentName,
        guests,
        amount
    });

    if (form) {
        res.status(201).json({
            _id: form._id,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            photo: form.photo,
            checkIn: form.checkIn,
            checkOut: form.checkOut,
            apartmentName: form.apartmentName,
            guests: form.guests,
            amount: form.amount,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

})
