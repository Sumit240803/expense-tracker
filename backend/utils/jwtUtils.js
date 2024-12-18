const jwt = require("jsonwebtoken");
require("dotenv").config();
function createJwt(user){
    const payload = {
        id : user._id,
        email : user.email
    }
    const option = {expiresIn : "1d"}
    return jwt.sign(payload ,process.env.SECRET_KEY , option );

}

function verifyJwt(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: "No token provided, access denied" });
    }

    const secret = process.env.SECRET_KEY;

    try {
        // Verify token
        const decoded = jwt.verify(token, secret);

        // Attach the decoded information (like user data) to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports ={createJwt , verifyJwt}