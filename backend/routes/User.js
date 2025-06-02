const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, deleteUser, getCurrentUser } = require("../controllers/User.js");
const { authenticate } = require("../middlewares/Authenticate.js"); // JWT middleware

// Auth routes
router.post('/register', registerUser);      // POST /api/users/register
router.post('/login', loginUser);            // POST /api/users/login
router.post('/logout', authenticate, logoutUser); // POST /api/users/logout
router.get('/me', authenticate, getCurrentUser);

// User management
router.delete('/:id', authenticate, deleteUser); // DELETE /api/users/:id

module.exports = router;
