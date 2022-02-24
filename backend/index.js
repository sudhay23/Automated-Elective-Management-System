const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// importing routes
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");

dotenv.config();

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("connected to mongoDB");
});

app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use("/dashboard", dashboardRoute);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
