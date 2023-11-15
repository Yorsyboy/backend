import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be at least 6 characters long'],
    },
    apartments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    }],
}, {
    timestamps: true
});

const user = mongoose.model('User', userSchema);

export default user;