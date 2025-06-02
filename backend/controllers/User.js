const User = require("../models/User");
const sequelize = require("../config/db");
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get Current User
const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            email: req.user.email,
            name: req.user.name,
            id: req.user.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching user data." });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields: name, email, and password.' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Email is already in use!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            name,
            password: hashedPassword
        });

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7200000
        });

        res.status(201).json({
            message: 'User registered successfully!',
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred during registration." });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields: email and password.' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Email or password is incorrect." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Email or password is incorrect." });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7200000
        });

        res.status(200).json({
            message: 'Login successful!',
            email: user.email,
            name: user.name,
            id: user.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during login." });
    }
};

// Logout User
const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};

// Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the user." });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    getCurrentUser
};