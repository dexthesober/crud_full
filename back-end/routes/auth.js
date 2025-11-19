const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const { registerSchema, loginSchema } = require("../validators/authValidators");

// register karne ke liye
router.post("/register", async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashed });
        await user.save();

        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// login karne ke liye
router.post("/login", async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
