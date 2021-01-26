const express = require('express');
const passport = require('passport');

const router = express.Router();

// Import controllers
const requestController = require('../controllers/request');
const { isAdmin } = require('../middlewares');

// User Routes
router.get(
  '/page/:page',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  requestController.getRequests,
);

router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  requestController.deleteRequest,
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  requestController.createRequest,
);

// Export Router
module.exports = router;
