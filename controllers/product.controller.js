const catchAsyncUtils = require("../utilities/catch-async.utils");
const Product = require("../models/product.model");
const SubCategory = require("../models/sub-category.model");
const Category = require('../models/category.model')
const slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const deleteuploadedPhoto = (req) => {
  if (req.file) {
    fs.unlink(path.join("uploads", req.file.filename), (err) => {
      if (err) console.log("Error deleting file:", err);
    });
  }
};

exports.addProduct = catchAsyncUtils(async (req, res) => {
  const { name, subcategory, price, description, stock } = req.body;

  const subCategory = await SubCategory.findById( subcategory );
  if (!subCategory) {
    deleteuploadedPhoto(req);

    return res
      .status(404)
      .json({ message: "sub category does'nt exist please enter existed one" });
  }

  const slug = slugify(name);
  const exists = await Product.findOne({ slug });
  if (exists) {
    deleteuploadedPhoto(req);

    return res.status(404).json({ message: "Product slug already exists" });
  }
  const Category = subCategory.category;
  const image = req.file.filename;

  const newProduct = await Product.create({
    name,
    subcategory: subCategory._id,
    category: Category._id,
    price,
    description,
    image,
    stock,
  });
  res
    .status(201)
    .json({ message: "Product created Successfully", data: newProduct });
});



exports.getProducts= catchAsyncUtils(async (req,res)=>{
    const products=await Product.find({isDeleted:false , isActive:true});
    return res.status(200).json(products)
})
exports.getProductsNewArrival= catchAsyncUtils(async (req,res)=>{
    const products=await Product.find({isDeleted:false , isActive:true,isNewArrival:true }).limit(10);
    return res.status(200).json(products)
})
exports.getProductsBestSeller= catchAsyncUtils(async (req,res)=>{
    const products=await Product.find({isDeleted:false , isActive:true, isBestSeller:true }).limit(10);
    return res.status(200).json(products)
})
exports.getProductsBySubCategory= catchAsyncUtils(async (req,res)=>{

    return res.status(200).json(res.paginatedResult)
})
exports.getProductDetailsById= catchAsyncUtils(async (req,res)=>{
  const ptoductId=req.params.id;
    const product=await Product.findOne({isDeleted:false , isActive:true,_id:ptoductId}).populate("category",'name').populate("subcategory",'name');
    return res.status(200).json(product)
})


exports.getProductsAdmin= catchAsyncUtils(async (req,res)=>{
    const products=await Product.find().populate('category','name').populate('subcategory','name');
    return res.status(200).json(products)
})

exports.editProduct = catchAsyncUtils(async (req, res) => {
  const subCategory = await SubCategory.findById(req.body.subcategory).populate("category");

  if (!subCategory) {
    return res.status(400).json({ message: "Invalid subcategory ID" });
  }
  const newSlug = slugify(req.body.name, { lower: true });
  
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: subCategory.category._id,
      subcategory: subCategory._id,
      price: req.body.price,
      stock: req.body.stock,
      isActive: req.body.isActive,
      isBestSeller: req.body.isBestSeller,
      isNewArrival: req.body.isNewArrival,
      isDeleted: req.body.isDeleted,
      img: req.file.filename || undefined,
      slug:newSlug
    },
    { new: true }
  );

  res.status(200).json({
    message: "Product updated successfully",
    data: updatedProduct
  });
});



exports.deleteProduct = catchAsyncUtils(async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  product.isDeleted = !product.isDeleted;

  product.save();
  res
    .status(200)
    .json({
      message: "Product isdeleted flag is changed Successfully",
      data: product,
    });
});
