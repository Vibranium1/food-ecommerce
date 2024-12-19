const express = require('express');
const User = require('../models/user'); 
const router = express.Router();


router.post('/create', async (req, res) => {
  const { username,phoneno, email, password } = req.body;
   console.log(req.body)
  if (!username ||!phoneno|| !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({
      username,
      phoneno,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
