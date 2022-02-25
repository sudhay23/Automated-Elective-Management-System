const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// importing routes
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");

dotenv.config();

const port = process.env.PORT || 5000;

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("connected to mongoDB");
});

app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use("/dashboard", dashboardRoute);

app.listen(port, () => {
    console.log("Server is running at http://localhost:" + port);
});
