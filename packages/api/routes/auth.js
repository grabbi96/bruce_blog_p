const express = require('express');
const passport = require('passport');

const router = express.Router();

// Import controllers
const authController = require('../controllers/auth');

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  authController.me
);

// Export Router
module.exports = router;
