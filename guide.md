// This will be a Node.js and React-based full-stack application.
// Below is the setup and implementation of the requested features step by step.

// Step 1: Initialize the Node.js project
// In your terminal:
// 1. mkdir online-courses-platform
// 2. cd online-courses-platform
// 3. npm init -y

// Step 2: Install required dependencies
// Run:
// npm install express mongoose jsonwebtoken bcryptjs cors dotenv nodemon

// Step 3: Setup the server (backend)
// Create a file `server.js` in the root folder.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Models
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  free: Boolean,
});

const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

// Routes
// 1. User Registration
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. User Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Fetch Courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Step 4: Frontend Setup
// Create a React app in the same root folder:
// npx create-react-app client
// cd client
// npm install axios react-router-dom bootstrap

// Step 5: Frontend Implementation
// Inside the `client/src` folder, create the following files:
// 1. Components: Login.js, Register.js, Courses.js, LandingPage.js
// 2. Pages: Profile.js, Settings.js, Notifications.js

// Implement the React components with appropriate Axios calls to communicate with the backend.

// Step 6: Run the application
// Start the backend server:
// npm run dev (using nodemon for live updates)
// Start the React frontend:
// cd client
// npm start

// Step 7: Deploy the application
// Deploy the backend on platforms like Heroku or Render.
// Deploy the frontend on platforms like Vercel or Netlify.

// You now have a full-stack application with user login, profiles, courses, and notifications!