const express= require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyJwt } = require("../utils/jwtUtils");
const cloudinary = require("../config/Cloudinary");
const upload = require("../utils/multer");
const { getUserFromToken } = require("../utils/getUser");
router.post("/upload-avatar",verifyJwt,upload.single("image") ,async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
          }
        const result = await cloudinary.uploader.upload(req.file.buffer,{
            folder : "Avatars"
        });
        const url = result.secure_url;
        const user =await getUserFromToken(req);
        user.avatar= url;
         user.save();

         res.json({ message: "Avatar uploaded successfully", avatarUrl: url });
    } catch (error) {
        
    }
})

module.exports = router;