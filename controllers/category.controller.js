const Category= require('../models/category.model');
const { findOne } = require('../models/user.model');
const catchAsyncUtils= require('../utilities/catch-async.utils');


exports.addCategory= catchAsyncUtils(async (req,res)=>{
    const {name}= req.body;
    if (await Category.findOne({name}))
        return res.status(403).json({message:"category name already exist"})
    const newCategory= await Category.create({name});
    res.status(201).json({message:"category name added successfully",  data: newCategory,})

})


exports.getCategory= catchAsyncUtils(async (req,res)=>{
    const Categories=await Category.find({isDeleted:false , isActive:true});
    return res.status(200).json(Categories)
})


exports.changeDeleteFlagCategory= catchAsyncUtils(async (req,res)=>{
    category= await Category.findById(req.params.id)
    category.isDeleted=!category.isDeleted

    await category.save();
    res.status(200).json({message:"category flag is changed successfully",data:category})
    
});
