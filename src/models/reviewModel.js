import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter the name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter the name'],
    },
    occupation: {
        type: String,
        required: [true, 'Please enter the occupation'],
    },
    star: {
        type: Number,
        required: [true, 'Please enter the star'],
    },
    image: {
        type: String,
        required: [true, 'Please enter the image'],
    },
    approved: {
        type: Boolean,
        default: false,
    },
    review: {
        type: String,
        required: [true, 'Please enter the review'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

const review = mongoose.model('Review', reviewSchema);

export default review;