const { check, body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateUserSignup = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .matches(/^[A-Za-z]/).withMessage('Username must start with a letter'),
  
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('role')
    .notEmpty().withMessage('Role is required (seller or buyer)')
    .isIn(['seller', 'buyer']).withMessage('Role must be either "seller" or "buyer"'),

    body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain at least one letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

// Validation middleware for login
const validateLogin = [
    // Check if the username is not empty
    check('email', 'Email is required').not().isEmpty(),
    // Check if the password is not empty and is at least 6 characters long
    check('password', 'Password is required').not().isEmpty(),
    // Middleware to handle the errors from the validation
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((error) => ({
            field: error.param,
            message: error.msg,
          })),
        });
      }
      next();
    }
  ];
  
  const validateAddProducts = [
    body('productName')
      .trim()
      .notEmpty().withMessage('Product Name is required.')
      .isLength({ min: 3 }).withMessage('Product Name  must be at least 3 characters long.'),
    
    body('category')
      .trim()
      .notEmpty().withMessage('Please provide a valid Product Category'),
  
    body('description')
      .notEmpty().withMessage('Product Description is required!!')
      .isLength({max : 150}).withMessage('Description must be less than 150 characters long.'),
  
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({gt : 0}).withMessage('Price must be a positive number'),

    body('discount')
    .optional()
    .isFloat({min:0, max:100}).withMessage('Discount must be between 0 and 100%'),
    
  ];  
// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

module.exports = {
  validateUserSignup,
  handleValidationErrors,
  validateLogin,
  validateAddProducts,
};