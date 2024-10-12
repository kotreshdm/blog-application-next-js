import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to create slug from name
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
