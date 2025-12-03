const Category = require("../models/category.model");
const SubCategory = require("../models/sub-category.model");
const catchAsyncUtils = require("../utilities/catch-async.utils");

exports.addSubCategory = catchAsyncUtils(async (req, res) => {
  const { name, category } = req.body;
  const parentCategory = await Category.findOne({ name: category });
  if (await SubCategory.findOne({ name }))
    return res.status(404).json({ message: "sub Category  exists" });
  if (!parentCategory)
    return res.status(404).json({ message: "Category not found" });
  const newSubCategory = await SubCategory.create({
    name,
    category: parentCategory._id,
  });
  res.status(201).json({
    message: "sub Category cretaed successfully",
    data: newSubCategory,
  });
});
exports.getSubCategory = catchAsyncUtils(async (req, res) => {

  const subCategories = await SubCategory.find({
    isDeleted: false,
    isActive: true,
  });
  return res.status(200).json(subCategories);
});
exports.getSubCategoriesClient = catchAsyncUtils(async (req, res) => {
  categoryId=req.params.id
  const subCategories = await SubCategory.find({
    isDeleted: false,
    isActive: true,category: categoryId,
  });
  return res.status(200).json(subCategories);
});

exports.getSubCategoryAdmin = catchAsyncUtils(async (req, res) => {
  const subCategories = await SubCategory.find().populate('category');
  return res.status(200).json(subCategories);
});

exports.editSubCategory = catchAsyncUtils(async (req, res) => {
  const parentCategory = await Category.findOne({ name: req.body.category });
  const subCategory = await SubCategory.findByIdAndUpdate(
   req.params.id,
    {
      name: req.body.name,
      category: parentCategory._id,
    },
    { new: true }
  );
  res.status(200).json({
    message: "sub Category updated successfully",
    data: subCategory,
  });
});

exports.changeDeleteFlagSubCategory = catchAsyncUtils(async (req, res) => {
  const subCategory = await SubCategory.findOne({ _id: req.params.id });
  subCategory.isDeleted = !subCategory.isDeleted;
  subCategory.save();

  res.status(200).json({
    message: "sub category flag is changed successfully",
    data: subCategory,
  });
});
