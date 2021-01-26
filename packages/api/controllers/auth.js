const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../validations/auth');

const User = require('../models/user');

exports.register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Input Validation
  if (!isValid) return res.status(400).json({ success: false, errors });

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    errors.email = 'Email already exists';
    return res.status(400).json({ success: false, errors });
  }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newUser.password = await bcrypt.hash(newUser.password, 10);
  await newUser.save();
  const token = jwt.sign(
    {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
    process.env.APP_SECRET
  );
  return res.status(200).json({ success: true, token: `Bearer ${token}` });
};

exports.login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Input Validation
  if (!isValid) return res.status(400).json({ success: false, errors });

  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    errors.email = 'User not found';
    return res.status(400).json({ success: false, errors });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    errors.password = 'Password incorrect';
    return res.status(400).json({ success: false, errors });
  }
  console.log(process.env.APP_SECRET);
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.APP_SECRET,
    { expiresIn: 3600 }
  );

  return res.status(200).json({ success: true, token: `Bearer ${token}` });
};

exports.me = async (req, res) =>
  res.status(200).json({
    authenticated: true,
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
