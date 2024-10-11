import mongoose from "mongoose";
console.log(process.env.DB_URI);
const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.DB_URI);
};
export default dbConnect;
