const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const catchAsyncUtils = require("../utilities/catch-async.utils");

exports.addCart = catchAsyncUtils(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOneAndUpdate(
    { user: userId, "items.product": productId },
    { $inc:{ "items.$.quantity": quantity } },
    { new: true }
  );
  if (cart) {
    return res.status(200).json({
      message: "product is added to cart successfully",
      data: cart,
    });
  }
  cart = await Cart.findOneAndUpdate(
    { user: userId },
    { $push: { items: { product: productId, quantity: quantity } } },
    { new: true, upsert: true }
  );
  res.status(200).json({message:"product is added to cart successfully ",data:cart})
});
