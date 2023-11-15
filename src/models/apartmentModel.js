import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name'],
    },
    images: [
        {
            type: String,
            required: [true, 'Please enter the image'],
        }
    ],
    description: {
        type: String,
        required: [true, 'Please enter the description'],
    },
    bedroom: {
        type: Number,
        required: [true, 'Please enter the number of bedrooms'],
    },
    toilet: {
        type: Number,
        required: [true, 'Please enter the number of toilets'],
    },
    guests: {
        type: Number,
        required: [true, 'Please enter the number of guests'],
    },
    kitchen: {
        type: String,
        required: [true, 'Please enter the type of kitchen'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price'],
    },
    partyGuests: {
        type: Number,
        required: [true, 'Please enter the number of party guests'],
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],
});

const apartment = mongoose.model('Apartment', apartmentSchema);

export default apartment;