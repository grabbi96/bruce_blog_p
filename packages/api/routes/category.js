const express = require('express');
const passport = require('passport');

const router = express.Router();

// Import controllers
const categoryController = require('../controllers/category');
const { isAdmin } = require('../middlewares');

// Category Routes
router.get('/page/:page', categoryController.getCategories);

router.get('/:slug', categoryController.getCategory);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  categoryController.createCategory);

router.delete(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  categoryController.deleteCategory,
);

router.put(
  '/:slug',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  categoryController.updateCategory,
);

// Export Router
module.exports = router;
