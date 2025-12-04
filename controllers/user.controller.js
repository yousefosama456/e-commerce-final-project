const catchAsyncUtils = require("../utilities/catch-async.utils");
const User = require("../models/user.model");

exports.getAllUsers = catchAsyncUtils(async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

exports.toggleUserIsBlocked = catchAsyncUtils(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  user.isBlocked = !user.isBlocked;
  await user.save();
  res
    .status(200)
    .json({
      message: "user isBlocked flag is changed successfully",
      data: user,
    });
});

exports.getUserAddress = catchAsyncUtils(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  res.status(200).json(user.addresses);
});
exports.saveNewAddress = catchAsyncUtils(async (req, res) => {
  const userId = req.user._id;
  newAddress=req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { $push: { addresses: newAddress } },
    { new: true }
  );

  res.status(200).json(user.addresses);
});
