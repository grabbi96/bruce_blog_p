const express = require('express');
require('express-async-errors');

const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const categoryRoutes = require('./routes/category');
const requestRoutes = require('./routes/request');

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.log('Connection to mongodb was not successful!', error);
  });

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Handle CORS errors
app.use(cors());

// Logger
app.use(morgan('dev'));

// Passport config
require('./utils/passport');
// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes);
app.use('/requests', requestRoutes);

console.log(process.env.APP_SECRET);

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  }
  next();
}
app.use(ignoreFavicon);
// Error handling
// General 404 error
app.use('/', (req, res, next) => {
  const error = new Error('Not found.');
  error.status = 404;
  next(error);
});
// All other errors
app.use((error, req, res) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message || 'Unhandled error occured',
      status: error.status || 500,
    },
  });
});
module.exports = app;
