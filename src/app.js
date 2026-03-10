const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const assessmentRoutes = require("./routes/assessment/assessmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/assessment", assessmentRoutes);

module.exports = app;
