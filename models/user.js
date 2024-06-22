import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensure a unique index is created
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: String,
    role: {
      type: [String],
      default: ["subscriber"],
    },
    image: String,
    resetCode: {
      data: String,
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 min
      },
    },
  },
  { timestamps: true }
);
userSchema.index({ email: 1 }, { unique: true });
userSchema.plugin(uniqueValidator, { message: "is already taken" });

const User = mongoose.model("User", userSchema);

export default User;
