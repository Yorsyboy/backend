import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import passwordValidator from 'password-validator';
// import mailchimp from 'mailchimp-api-v3';
import axios from 'axios';



// const nodemailer = require('nodemailer');
const passwordSchema = new passwordValidator();

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     auth: {
//         user: 'milanosignatureint@gmail.com',
//         pass: 'milano2021!',
//     },
// });


// Initialize mailchimp API
// const apiKey = process.env.MAILCHIMP_API_KEY;
// const client = new mailchimp(apiKey);



// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Validate password
    // Minimum length of 6 characters
    passwordSchema.is().min(6);

    // Require at least one uppercase letter
    passwordSchema.has().uppercase();

    // Require at least one lowercase letter
    passwordSchema.has().lowercase();

    // Require at least one digit
    passwordSchema.has().digits();

    // Require at least one symbol
    passwordSchema.has().symbols();


    if (!passwordSchema.validate(password)) {
        res.status(400);
        throw new Error('Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter and one digit, one symbol');
    }

    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

})

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user mail
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});



// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});


// @desc   Forgot password
// @route   POST /api/users/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }


        const resetLink = generateResetLink();
        sendResetPasswordEmail(email, resetLink);

        return res.status(200).json({
            message: 'Reset password link sent successfully'
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }

});

function generateResetLink() {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });
    const resetLink = `${process.env.BASE_URL}/api/users/reset-password/${token}`;
    return resetLink;
}

function sendResetPasswordEmail(email, resetLink) {
   
}


// @desc    Reset password
// @route   POST /api/users/reset-password/:token
// @access  Public
// const resetPassword = asyncHandler(async (req, res) => {
//     const { token } = req.params;
//     const { password } = req.body;

//     // Find user by token
//     const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD);

//     if (!decoded) {
//         res.status(401);
//         throw new Error('Invalid token');
//     }

//     // Check for user mail
//     const user = await User.findById(decoded._id);

//     if (!user) {
//         res.status(404);
//         throw new Error('User not found');
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Update password
//     user.password = hashedPassword;
//     user.resetLink = '';

//     await user.save();

//     // Send a confirmation email
//     const mailOptions = {
//         from: process.env.EMAIL_USERNAME,
//         to: user.email,
//         subject: 'Password Reset Confirmation',
//         html: `
//             <h2>Your password has been reset successfully</h2>
//         `
//     };

//     transporter.sendMail(mailOptions, (err, data) => {
//         if (err) {
//             res.status(500);
//             throw new Error('Something went wrong');
//         } else {
//             res.status(200).json({
//                 message: `Password reset successful`
//             });
//         }
//     });
// });


//Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3hrs'
    });
}

