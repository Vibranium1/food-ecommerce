const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/user");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password )

  try {

    let user = await Admin.findOne({ email }); // Check if the user is an admin
    if (!user) {
      user = await User.findOne({ email }); // If not, check if they are a regular user
    }
    console.log("1");
    if (!user) return res.status(401).json({ message: "User does not exist" });


    const isPasswordCorrect = await bcrypt.compare(password,  user.password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Issue with Password" });
    console.log("2");

    const JWT_SECRET = process.env.JWT_SECRET;


    const token = jwt.sign({ id: user._id, role: user instanceof Admin ? 'admin' : 'user' }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
    console.log("3");
  } catch (err) {
  
    res.status(500).json({ message: "Server error2", error: err.message });
  }
});

module.exports = router;
