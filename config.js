const DB_URI =
  "mongodb+srv://scriptographics:J3A8H9bduyniz8fO@myblog22custer.rrrhl8a.mongodb.net/?retryWrites=true&w=majority&appName=myblog22custer";

const API =
  process.env.NODE_ENV === "production"
    ? "https://techpack-desiginers-app.netlify.app/api"
    : "http://localhost:3000/api";
const NEXTAUTH_SECRET = "techblog6504A#";

const GOOGLE_CLIENT_ID = "xxx-xxx.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "xxx-xxx-xxx";
module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};
