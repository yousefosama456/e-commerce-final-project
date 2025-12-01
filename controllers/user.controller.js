const catchAsyncUtils = require("../utilities/catch-async.utils");
const User= require('../models/user.model');

exports.getAllUsers= catchAsyncUtils(async(req,res)=>{
    const allUsers= await User.find();
    res.status(200).json(allUsers);

})


exports.toggleUserIsBlocked= catchAsyncUtils(async(req,res)=>{
    const userId= req.params.id;
    const user= await User.findById(userId);
    user.isBlocked=!user.isBlocked;
    await user.save();
    res.status(200).json({message:"user isBlocked flag is changed successfully",data:user})
   

})