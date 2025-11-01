import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRY } from '../config/env.js';
import User from '../models/user.model.js';

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password } = req.body;

    // Validate request body
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: username, email, and password',
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create(
      [
        {
          username,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      message: 'User registration failed',
      error: error.message || error,
    });
  }
};

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: email and password',
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect Password, Try Again',
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    res.status(200).json({
      success: true,
      message: 'Log-in successful',
      data: {
        token,
        user,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: 'Log-in failed',
      error: error.message || error,
    });
  }
};

export const signOut = async (req, res, next) => {

};