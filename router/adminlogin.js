const express = require("express");
const User = require("../models/user-model");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // find the admin user, or create one if none exists
    let adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      adminUser = await User.create({
        username: process.env.ADMIN_USERNAME,
        email: "admin@codeveda.com",
        phone: "0000000000",
        password: process.env.ADMIN_PASSWORD,
        isAdmin: true,
      });
    }

    res.status(200).json({
      message: "Login successful",
      token: await adminUser.generateToken(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;