const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    priceAtPurchase: {type:Number,required: true},
    quantity: {type:Number,required: true}
  }],

  totalPrice: Number,

  address: {
    governorate: String,
    city: String,
    addressLine: String
  },

  phone: String,

  status: {
    type: String,
    enum: [
      "pending",
      "preparing",
      "shipped",
      "delivered",
      "refused",
      "cancelledByAdmin"
    ],
    default: "pending"
  },

  isCancelledByUser: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
