const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const catchAsyncUtils = require("../utilities/catch-async.utils");

exports.addCart = catchAsyncUtils(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  // Get the product to check stock
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (cart) {
    const itemInCart = cart.items.find(
      (item) => item.product.toString() === productId
    );

    const totalQuantity = itemInCart
      ? itemInCart.quantity + quantity
      : quantity;

    if (totalQuantity > product.stock) {
      return res.status(400).json({
        message: `Cannot add product. no left stock available more than added Only ${
          (itemInCart?.quantity || 0)
        } left in stock.`,
      });
    }

    if (itemInCart) {
      cart = await Cart.findOneAndUpdate(
        { user: userId, "items.product": productId },
        { $inc: { "items.$.quantity": quantity } },
        { new: true }
      );
    } else {
      cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { items: { product: productId, quantity: quantity } } },
        { new: true }
      );
    }
  } else {
    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Cannot add product. Only ${product.stock} left in stock.`,
      });
    }

    cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $push: { items: { product: productId, quantity: quantity } } },
      { new: true, upsert: true }
    );
  }

  res.status(200).json({
    message: "Product is added to cart successfully",
    data: cart,
  });
});

exports.getUserCart = catchAsyncUtils(async (req, res) => {
  const userId = req.user._id;
  userCart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "name price image stock"
  );
  return res.status(200).json(userCart);
});
exports.updateQuantity = catchAsyncUtils(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (quantity < 0) {
    return res.status(400).json({ message: "Quantity cannot be negative" });
  }
  let cart;
  if (quantity === 0) {
    cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: { items: { product: productId } },
      },
      { new: true }
    ).populate("items.product", "name price image");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
  } else {
    cart = await Cart.findOneAndUpdate(
      {
        user: userId,
        "items.product": productId,
      },
      {
        $set: {
          "items.$.quantity": quantity,
        },
      },
      { new: true }
    ).populate("items.product", "name price image");

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Product not in cart or cart not found" });
    }
  }
  cart.totalPrice = cart.items.reduce((sum, item) => {
    const price = item.product.price;
    return sum + item.quantity * price;
  }, 0);

  await cart.save();

  return res.status(200).json({
    message: "Cart updated successfully",
    cart,
  });
});
exports.removeItemFromCart = catchAsyncUtils(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  ItemRemoveFromCart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: { product: productId } } },
    { new: true }
  ).populate("items.product", "name price image");
  return res.status(200).json({
    message: "product is removed from cart successfully",
    data: ItemRemoveFromCart,
  });
});
