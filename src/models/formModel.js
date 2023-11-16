import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your firstname'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your lastname'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
    },
    phone: {
        type: Number,
        required: [true, 'Please enter your phone number'],
    },
    photo: {
        type: [String],
        // required: [true, 'Please upload your photo'],
    },
    checkIn: {
        type: Date,
        required: [true, 'Please enter your check in date'],
    },
    checkOut: {
        type: Date,
        required: [true, 'Please enter your check out date'],
    },
    apartmentName: {
        type: String,
        required: [true, 'Please enter your apartment name'],
    },
    guests: {
        type: String,
        required: [true, 'Please enter guests'],
    },
    amount: {
        type: Number,
        required: [true, 'Please enter amount'],
    },
}, {
    timestamps: true
});

const user = mongoose.model('Form', formSchema);

export default user;