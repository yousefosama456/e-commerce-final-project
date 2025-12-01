const mongoose = require("mongoose");
const slugify = require("slugify");

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      lowerCase: true,
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

subCategorySchema.pre("save", async function()  {
  if (!this.isModified("name")) return;
  this.slug = slugify(this.name, { lower: true });
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
