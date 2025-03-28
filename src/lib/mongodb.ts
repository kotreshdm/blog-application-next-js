import { MongoClient } from "mongodb";

if (!process.env.DB_URI) {
  console.error("Database URI is not defined in environment variables");
  process.exit(1);
}

const client = new MongoClient(process.env.DB_URI);

const clientPromise = client
  .connect()
  .then((connectedClient) => {
    console.log("Successfully connected to MongoDB");
    return connectedClient;
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Check if the connection is active
(async () => {
  try {
    await clientPromise;
    console.log("MongoDB connection is active.");
  } catch (error) {
    console.error("Failed to establish an active MongoDB connection:", error);
  }
})();

export default clientPromise;
