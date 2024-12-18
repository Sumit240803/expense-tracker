const express= require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const { createJwt } = require("../utils/jwtUtils");
router.post("/register", async(req,res)=>{
    try {
        const {name , email , password} = req.body;
        const exist = await User.findOne({email});
        if(exist){
            return res.status(400).json({"Message" : "User Already Exists"});
        }
        const user = new User({
            name : name,
            email : email,
            password : password
        });
        await user.save();
        return res.status(201).json({"Message" : "User Registered"});
    } catch (error) {
        return res.status(400).json({"Message" : error});
    }
});

router.post("/login" , async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
         
          const token = createJwt(user);
          
          res.json({ message: "Login successful", token });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "ERROR"});
    }
})

module.exports = router;