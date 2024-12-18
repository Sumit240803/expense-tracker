const jwt = require("jsonwebtoken");

const User = require("../models/User"); // Import your user model
require("dotenv").config();

// Function to find the user using the token from the request header
async function getUserFromToken(req) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        throw new Error("No token provided, access denied");
    }

    const secret = process.env.SECRET_KEY;

    try {
        // Verify the token and decode the payload
        const decoded = jwt.verify(token, secret);

        // Find the user in the database using the decoded ID
        const user = await User.findById(decoded.id); // Assuming your payload contains the user's ID

        if (!user) {
            throw new Error("User not found");
        }

        // Return the user
        return user;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}

module.exports = { getUserFromToken };
