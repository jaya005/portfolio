const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables

const app = express();

// Replace with your MongoDB connection URI
// const uri = "mongodb://localhost:27017/proffolio"; // Or use process.env.MONGO_URI
const uri = process.env.MONGO_URI;
// Connect to MongoDB using Mongoose
mongoose.connect(uri)
.then(() => {
  console.log("Connected to MongoDB successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Serve static files (e.g., uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import and use route handlers
const authRoutes = require("./routes/auth");
const achievementsRoutes = require("./achievements");
const blogRoutes = require("./blog");
const collaborationsRoutes = require("./collaborations");
const conferencesRoutes = require("./conferences");
const experienceRoutes = require("./experience");
const projectsRoutes = require("./projects");
const researchRoutes = require("./research");

// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/", achievementsRoutes);
app.use("/", blogRoutes);
app.use("/", collaborationsRoutes);
app.use("/", conferencesRoutes);
app.use("/", experienceRoutes);
app.use("/", projectsRoutes);
app.use("/", researchRoutes);
// Simple home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
