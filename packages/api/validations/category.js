const Validator = require('validator');
const isEmpty = require('./is-empty');

exports.validateCategoryInput = (data) => {
  const errors = {};
  const newData = { ...data };

  newData.name = !isEmpty(data.name) ? data.name : '';
  newData.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(newData.name, { min: 2, max: 100 })) {
    errors.name = 'Category must be between 2 and 100 characters';
  }

  if (Validator.isEmpty(newData.name)) {
    errors.name = 'Category Name is required';
  }

  if (Validator.isEmpty(newData.description)) {
    errors.description = 'Category description is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
