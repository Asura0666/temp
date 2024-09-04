const express = require('express');
const Feedback = require('../models/Feedback');

const router = express.Router();

// Submit Feedback
router.post('/submit', async (req, res) => {
    const { name, email, feedback } = req.body;

    // Ensure all required fields are provided
    if (!email || !feedback) {
        return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    try {
        // Create new feedback entry
        const newFeedback = new Feedback({
            name,
            email,
           feedback // Mapping the form 'feedback' field to the 'description' field in the model
        });

        await newFeedback.save();
        res.status(201).json({ msg: 'Feedback submitted successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
