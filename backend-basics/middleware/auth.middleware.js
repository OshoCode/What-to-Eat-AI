import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';


const authorize = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, Authorization denied',
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password -__v'); // Exclude password and version field
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid, Unauthorized access',
            });
        }
        req.user = user; // Attach user to request object

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token is not valid, Unauthorized access',
            error: error.message,
        });
    }
}

export default authorize;