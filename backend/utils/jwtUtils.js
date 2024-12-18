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

function verifyJwt(token){
    const secret = process.env.SECRET_KEY;
    try {
        const decoded=  jwt.verify(token ,secret);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports ={createJwt , verifyJwt}