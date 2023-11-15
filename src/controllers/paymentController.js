import axios from 'axios';
import Payment from '../models/paymentModel.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';


dotenv.config();


// Paystack API key
const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

// @desc   Initialize payment
// @route  POST /api/users/initialize-payment
// @access Public
export const initializePayment = asyncHandler(async (req, res) => {
    const { email, amount, apartmentId } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Initialize payment with Paystack
        const paystackResponse = await axios.post('https://api.paystack.co/transaction/initialize', {
            email,
            amount: amount * 100, // Paystack API expects amount in kobo
            callback_url: `${process.env.CLIENT_URL}/payment-success`
        }, {
            headers: {
                Authorization: `Bearer ${paystackSecretKey}`
            }
        });

        // Create a payment record in the database and associate it with the user and apartment
        const payment = await Payment.create({
            email,
            amount,
            apartment: apartmentId,
            reference: paystackResponse.data.data.reference,
            status: 'pending'
        });

        res.status(200).json({
            message: 'Payment initialized successfully',
            data: paystackResponse.data.data
        });

        // Function to periodically update payment status based on Paystack's response
        const updatePaymentStatus = async () => {
            const verifyResponse = await axios.get(`https://api.paystack.co/transaction/verify/${payment.reference}`, {
                headers: {
                    Authorization: `Bearer ${paystackSecretKey}`
                }
            });

            const status = verifyResponse.data.data.status;

            // Update payment status based on verification response
            payment.status = status;
            await payment.save();

            // Handle different payment statuses here if needed
        };

        // Verify payment status every 10 seconds
        setInterval(updatePaymentStatus, 10000);

    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Handle specific 401 unauthorized error here
            return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
            
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
