const Order = require("../models/order.model");
const mongoose = require("mongoose");
const catchAsyncUtils = require("../utilities/catch-async.utils");

exports.getSalesReport = catchAsyncUtils(async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "startDate and endDate are required" });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const summary = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $addFields: {
        totalPrice: {
          $multiply: ["$items.priceAtPurchase", "$items.quantity"],
        },
      },
    },
    {
      $facet: {
        overallStats: [
          {
            $group: {
              _id: "$_id", // group by order _id
              orderTotal: {
                $sum: {
                  $multiply: ["$items.priceAtPurchase", "$items.quantity"],
                },
              },
              totalQuantity: { $sum: "$items.quantity" },
            },
          },
          {
            $group: {
              _id: null,
              totalSalesAmount: { $sum: "$orderTotal" },
              totalQuantitySold: { $sum: "$totalQuantity" },
              totalOrders: { $sum: 1 }, // now counts each order once
            },
          },
        ],
        topProducts: [
          {
            $group: {
              _id: "$product._id",
              name: { $first: "$product.name" },
              revenue: { $sum: "$totalPrice" },
              quantitySold: { $sum: "$items.quantity" },
            },
          },
          { $sort: { revenue: -1 } },
          { $limit: 5 },
        ],
        topUsers: [
          {
            $group: {
              _id: "$user._id",
              name: { $first: "$user.name" },
              email: { $first: "$user.email" },
              totalSpent: { $sum: "$totalPrice" },
              totalQuantity: { $sum: "$items.quantity" },
              totalOrders: { $sum: 1 },
            },
          },
          { $sort: { totalSpent: -1 } },
          { $limit: 5 },
        ],
        monthlySales: [
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
              },
              totalRevenue: { $sum: "$totalPrice" },
              totalQuantity: { $sum: "$items.quantity" },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ],
      },
    },
  ]);

  res.status(200).json({
    message: `Sales report from ${startDate} to ${endDate}`,
    data: summary,
  });
});
