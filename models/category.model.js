const mongoose = require("mongoose");
const slugify= require('slugify')

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

categorySchema.pre("save", async function () {
  if (!this.isModified("name")) return ;

  this.slug = slugify(this.name, { lower: true });

});

module.exports = mongoose.model("Category", categorySchema);
