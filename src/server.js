require("dotenv").config();
const app = require("./app");
const db = require("./config/db");

const PORT = Number(process.env.PORT) || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });

  db.query("SELECT 1")
    .then(() => {
      console.log("Database connection established");
    })
    .catch((error) => {
      console.warn("Database unavailable. DB-backed endpoints may fail until connection is restored.");
      console.warn(error.message);
    });
};

startServer();
