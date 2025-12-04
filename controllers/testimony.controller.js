const Testimony = require("../models/testimony.model");
const catchAsyncUtils = require("../utilities/catch-async.utils");
const User = require("../models/user.model");

exports.addTestimony = catchAsyncUtils(async (req, res) => {
  const userId = req.user._id;
  const { description } = req.body;

  if (!description)
    return res.status(400).json({ message: "Description is required" });

  const testimony = await Testimony.create({ user: userId, description });

  res
    .status(201)
    .json({ message: "Testimony submitted successfully", data: testimony });
});

exports.getAllTestimonies = catchAsyncUtils(async (req, res) => {
  const testimonies = await Testimony.find()
    .populate("user", "email phone")
    .sort({ createdAt: -1 });

  res.status(200).json(testimonies);
});

exports.approveTestimony = catchAsyncUtils(async (req, res) => {
  const { id } = req.params;
  const testimony = await Testimony.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true }
  );

  if (!testimony)
    return res.status(404).json({ message: "Testimony not found" });

  res.status(200).json({ message: "Testimony approved", data: testimony });
});
exports.getApprovedTestimonies = catchAsyncUtils(async (req, res) => {
  const testimonies = await Testimony.find({ isApproved: true })
    .populate("user", "name ")
    .sort({ createdAt: -1 });

  res.status(200).json(testimonies);
});
