import express from 'express';
import { getMe, login, register } from '../controllers/userController.js';
import { initializePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';


const userRouter = express.Router();


userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/me',protect, getMe);
// userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/paystack/createPayStackPayment', initializePayment);

// router.post('/reset-password/:token', resetPassword);


export default userRouter;