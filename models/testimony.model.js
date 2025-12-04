const mongoose = require("mongoose");

const testimonySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
    isApproved: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimony", testimonySchema);
