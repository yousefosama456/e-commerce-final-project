const mongoose = require("mongoose");
const slugify = require("slugify");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    price: { type: Number, required: true },
    description: String,
    image: String,
    stock: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.pre("save", async function () {
  if (!this.isModified("name")) return;

  this.slug = slugify(this.name, { lower: true });
});
module.exports = mongoose.model("Product", productSchema);
