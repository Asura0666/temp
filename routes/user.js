const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Ensure all fields are provided
  if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({
          name,
          email,
          password: hashedPassword
      });

      await user.save();
      res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        res.status(200).json({ msg: 'Login successful' });

        // Normally, you would generate a JWT token here and send it back:
        // const token = jwt.sign({ user: { id: user.id } }, config.get('jwtSecret'), { expiresIn: 3600 });
        // res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
