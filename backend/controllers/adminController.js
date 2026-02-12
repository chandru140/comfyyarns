import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Input validation middleware
export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
export const adminLogin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid input',
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }
    
    // Check for fixed admin credentials from environment variables
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    
    if (ADMIN_EMAIL && ADMIN_PASSWORD && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate token with a fixed admin ID for the hardcoded admin
      const token = generateToken('fixed-admin-id');
      
      return res.json({
        success: true,
        token,
        admin: {
          id: 'fixed-admin-id',
          email: ADMIN_EMAIL,
          isFixedAdmin: true
        }
      });
    }
    
    // If not fixed admin, check database
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Check password
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    // Generate token
    const token = generateToken(admin._id);
    
    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify token
// @route   POST /api/admin/verify
// @access  Private
export const verifyToken = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select('-password');
    
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create admin (use once to set up)
// @route   POST /api/admin/create
// @access  Public (should be disabled in production)
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin already exists' 
      });
    }
    
    const admin = await Admin.create({ email, password });
    
    const token = generateToken(admin._id);
    
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
