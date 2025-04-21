const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // For handling file paths
const authRoutes = require('./routes/auth'); // Routes for registration and login

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Serve static files from the 'public' folder (frontend files like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("MongoDB connection error ❌", err));

// Auth Routes (Login and Registration)
app.use('/api/auth', authRoutes);

// Serve the homepage (login page) when visiting "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
