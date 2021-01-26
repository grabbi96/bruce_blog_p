const Validator = require('validator');
const isEmpty = require('./is-empty');

exports.validateRegisterInput = (data) => {
  const errors = {};
  const newData = { ...data };

  newData.name = !isEmpty(data.name) ? data.name : '';
  newData.email = !isEmpty(data.email) ? data.email : '';
  newData.password = !isEmpty(data.password) ? data.password : '';
  newData.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

  if (!Validator.isLength(newData.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(newData.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(newData.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(newData.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(newData.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(newData.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(newData.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password field is required';
  }

  if (!Validator.equals(newData.password, newData.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.validateLoginInput = (data) => {
  const errors = {};
  const newData = { ...data };

  newData.email = !isEmpty(data.email) ? data.email : '';
  newData.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(newData.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(newData.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(newData.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
