const DB_URI =
  "mongodb+srv://scriptographics:J3A8H9bduyniz8fO@myblog22custer.rrrhl8a.mongodb.net/?retryWrites=true&w=majority&appName=myblog22custer";

const API =
  process.env.NODE_ENV === "production"
    ? "https://techpack-desiginers-app.netlify.app/api"
    : "http://localhost:3000/api";
const NEXTAUTH_SECRET = "techblog6504A#";

const GOOGLE_CLIENT_ID = "xxx-xxx.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "xxx-xxx-xxx";

// merncms
const CLOUDINARY_CLOUD_NAME = "ddc0fo7vs";
const CLOUDINARY_API_KEY = "852856672128175";
const CLOUDINARY_API_SECRET = "hfPxrERtb610m3h4BI7Mpp3NusY";

module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
