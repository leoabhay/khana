const { body, validationResult } = require('express-validator');

// Validation rules for signup
const signupValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('name').notEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ];
};

// Validation rules for login
const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
};

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  signupValidationRules,
  loginValidationRules,
  validate,
};
