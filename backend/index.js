const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookies = require("cookie-parser");
const cors = require("cors");
// importing routes
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
const facultyRoute = require("./routes/faculty");

dotenv.config();

const port = process.env.PORT || 5000;

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("connected to mongoDB");
});

app.use(cookies());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://automated-elective-management-system.vercel.app/",
        ],
        credentials: true,
        methods: "GET,POST,DELETE,PUT",
    })
);
app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use("/api/faculty", facultyRoute);
app.use("/dashboard", dashboardRoute);

app.listen(port, () => {
    console.log("Server is running at http://localhost:" + port);
});
