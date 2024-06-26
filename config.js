const API =
  process.env.NODE_ENV === "production"
    ? "https://techpack-desiginers-app.netlify.app/api"
    : "http://localhost:3000/api";

const GOOGLE_CLIENT_ID = "xxx-xxx.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "xxx-xxx-xxx";

module.exports = {
  API,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};
