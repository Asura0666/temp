const mongoose = require('mongoose');

// Feedback Schema
const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Name is optional according to your form
    },
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
