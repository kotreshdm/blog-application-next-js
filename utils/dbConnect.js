import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    // Check if mongoose is already connected or connecting
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
    };

    console.log("Connecting to the database...");

    await mongoose.connect(process.env.DB_URI, options);

    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default dbConnect;
