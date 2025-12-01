const catchAsyncUtils = require("../utilities/catch-async.utils");
const Product = require("../models/product.model");
const SubCategory = require("../models/sub-category.model");
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

  const subCategory = await SubCategory.findOne({ name: subcategory });
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
