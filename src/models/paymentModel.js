import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    countrycode: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    photo: {
        type: String,
    },
    price: {
        type: Number,
        // required: [true, 'Please enter the amount'],
    },
    reference: {
        type: String,
    },
    status: {
        type: String,
        required: [true, 'Please enter the status'],
    },
}, {
    timestamps: true
});


const payment = mongoose.model('Payment', paymentSchema);

export default payment;