const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type :String , unique : true , required : true},
    password : {type : String , required : true},
    avatar : {type : String , default : ''}
},
{
    timestamps : true
})

UserSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next;
    try{
        const salt =await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(err){
        next(err);
    }
});


const User = mongoose.model("User" , UserSchema );
module.exports = User;