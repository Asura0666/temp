const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const feedbackRoutes = require('./routes/feedback');
const cors = require('cors');

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
const dbURI = 'mongodb+srv://tanmaylokare1507:tanmay12345@cluster0.iqygptm.mongodb.net/tanmay';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/feedback', feedbackRoutes);

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
