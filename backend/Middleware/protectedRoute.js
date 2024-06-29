import User from "../Models/userModel.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "hello";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
       
        if (!token) {
            console.log('working1')
            return res.status(401).json({ error: 'Unauthorized - User does not have a token' });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in the protect route middleware", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default protectedRoute;
