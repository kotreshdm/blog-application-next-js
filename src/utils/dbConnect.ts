import mongoose from "mongoose";
const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const dbUri = process.env.DB_URI;

  if (!dbUri) {
    throw new Error(
      "Database connection URI is missing. Please set DB_URI in the environment variables."
    );
  }

  await mongoose.connect(dbUri);
};
export default dbConnect;
