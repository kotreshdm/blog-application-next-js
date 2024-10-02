const DB_URI =
  process.env.NODE_ENV ===
  "mongodb+srv://kotreshdm:Mahindra13#23@blog-db.jzamp.mongodb.net/?retryWrites=true&w=majority&appName=blog-db";

const API =
  process.env.NODE_ENV === "production"
    ? "https://xxx.vercel.app/api"
    : "http://localhost:3000/api";

// const NEXTAUTH_SECRET = "YOUR_SECRET";

// const GOOGLE_CLIENT_ID = "xxx-xxx.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "xxx-xxx-xxx";

// // merncms
// const CLOUDINARY_CLOUD_NAME = "your_cloud_name";
// const CLOUDINARY_API_KEY = "xxx-xxx-xxx";
// const CLOUDINARY_API_SECRET = "xxx-xxx-xxx";

// // sending email
// const GMAIL_AUTH_USER = "your_email@gmail.com";
// const GMAIL_AUTH_PASS = "xxxxxx";

module.exports = {
  DB_URI,
  API,
  // NEXTAUTH_SECRET,
  // GOOGLE_CLIENT_ID,
  // GOOGLE_CLIENT_SECRET,
  // CLOUDINARY_CLOUD_NAME,
  // CLOUDINARY_API_KEY,
  // CLOUDINARY_API_SECRET,
  // GMAIL_AUTH_USER,
  // GMAIL_AUTH_PASS,
};
