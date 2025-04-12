import mongoose from "mongoose";
import slugify from "slugify";

const BlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a blog title"],
      unique: true,
      trim: true,
      maxlength: [200, "Name cannot be more than 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    seoDescription: {
      type: String,
    },
    seoKeyword: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
    },
    image: {
      type: Buffer,
      contentType: String,
    },
    blogStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
