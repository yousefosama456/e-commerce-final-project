const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Order = require('../models/order.model');
const catchAsyncUtils = require("../utilities/catch-async.utils");

exports.addOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0)
      return res.status(404).json({ message: "cart not found or empty" });

    let orderItems = [];
    let totalPrice = 0;

    for (let item of cart.items) {
      let product = await Product.findById(item.product).session(session);
      if (!product) throw new Error("Product not found");
      if (item.quantity > product.stock)
        return res
          .status(404)
          .json({
            message: `quantity for ${product.name} is more than available stock `,
          });
          product.stock -=item.quantity
          totalPrice+=product.price*item.quantity;

          await product.save({session});
          orderItems.push({
            product:product._id,
            priceAtPurchase:product.price,
            quantity:item.quantity
          })



    }
    const order= await Order.create([{
        user: userId,
        items:orderItems,
        totalPrice:totalPrice,
        address:req.body.address,
        phone:req.body.phone


    }],{session})
    cart.items=[];
    await cart.save({session});
    await session.commitTransaction();
    session.endSession();

   return res.status(201).json({message:"order replaced successfully",data:order})

  } catch (err) {
       await session.abortTransaction();
       session.endSession();
       res.status(400).json({
      message: err.message
    });

  }
};

exports.getAllOrder= catchAsyncUtils(async(req,res)=>{
  const orders= await Order.find() .populate("user", "email").populate('items.product','name');
  return res.status(200).json(orders);
})
exports.getUserOrder= catchAsyncUtils(async(req,res)=>{
  const userId=req.user._id
  const orders= await Order.find({user:userId}) .populate("user", "email").populate('items.product','name price').sort({ createdAt: -1 });
  return res.status(200).json(orders);
})

exports.updateOrderStatus =catchAsyncUtils(async(req,res)=>{
  const userId= req.params.id;
  const newStatus=req.body.status;
  const orderStateUpdate= await Order.findByIdAndUpdate(userId, { status: newStatus },{new:true});
  return res.status(200).json({message:"Order Status Updated Successfully", data: orderStateUpdate})
})
