const DB_URI =
  "mongodb+srv://scriptographics:J3A8H9bduyniz8fO@myblog22custer.rrrhl8a.mongodb.net/?retryWrites=true&w=majority&appName=myblog22custer";

const API =
  process.env.NODE_ENV === "production"
    ? "https://techpack-desiginers-app.netlify.app/api"
    : "http://localhost:3000/api";

module.exports = {
  DB_URI,
  API,
};
