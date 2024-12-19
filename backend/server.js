const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require("mongoose");
const User = require("./models/user");
const axios = require("axios");

const app = express();

// More permissive CORS (for development)
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // form data

// Detailed logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Routes
const emailRoutes = require('./routes/email');
app.use('/api/email', emailRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});






// MongoDB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/dashboardApp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

  
// // Predefined Users
// const predefinedUsers = [
//   { name: "John Doe", uniqueID: "12345", dashboardType: "district" },
//   { name: "Jane Smith", uniqueID: "67890", dashboardType: "state" },
//   { name: "Alice Brown", uniqueID: "11223", dashboardType: "admin" },
// ];

// // Insert Predefined Users into Database
// const insertPredefinedUsers = async () => {
//   try {
//     for (const user of predefinedUsers) {
//       const existingUser = await User.findOne({ uniqueID: user.uniqueID });
//       if (!existingUser) {
//         await User.create(user);
//       }
//     }
//     console.log("Predefined users inserted.");
//   } catch (error) {
//     console.error("Error inserting predefined users:", error);
//   }
// };
// insertPredefinedUsers();

// // Signup Route
// app.post("/api/signup", async (req, res) => {
//   const { name, uniqueID, dashboardType } = req.body;

//   try {
//     if (!name || !uniqueID || !dashboardType) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the user is in predefined users
//     const predefinedUser = await User.findOne({ uniqueID, name, dashboardType });
//     if (predefinedUser) {
//       return res.status(201).json({
//         message: "Signup successful. Please log in.",
//         user: predefinedUser,
//       });
//     }

//     // User not in predefined users
//     return res.status(400).json({
//       message: "Your request has been sent for review.",
//       status: "pending",
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Login Route
// app.post("/api/login", async (req, res) => {
//     const { uniqueID, captchaValue } = req.body;
  
//     // Verify CAPTCHA token
//     const secretKey = "6LcvwosqAAAAAFJ5QbQOj1MYRgUMNalfhuc4r12F"; // Replace with your secret key
//     const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaValue}`;
  
//     try {
//       const response = await axios.post(verifyUrl);
//       if (!response.data.success) {
//         return res.status(400).json({ message: "Invalid CAPTCHA" });
//       }
  
//       // Proceed with user authentication logic
//       const user = await findUserByID(uniqueID); // Replace with your user lookup logic
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       // Example: Return dashboard type for navigation
//       res.status(200).json({ dashboardType: user.dashboardType });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error during CAPTCHA verification" });
//     }
//   });
  









// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));