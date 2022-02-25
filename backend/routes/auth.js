const router = require("express").Router();
const User = require("../model/userRegistrationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER route
router.post("/register", async (req, res) => {
    // check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(400).send("User already exists, please login");

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // else we create a new user and store it to database

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
    });
    try {
        const savedUser = await user.save();
        res.send({
            user: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            date: user.date,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

// LOGIN route
router.post("/login", async (req, res) => {
    // checking if email exists in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is incorrect");
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword)
        return res.status(400).send("Email or password is incorrect");

    // create and assin a token to the user
    const token = jwt.sign(
        { _id: user._id, email: user.email, name: user.name, role: user.role },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: "60s",
        }
    );

    // send token in header and user data in body
    res.cookie("auth-token", token, {
        maxAge: "60000",
    }).send({
        user: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        loginTime: user.date,
    });
});

// AUTHORIZE a token route
router.post("/authorize", (req, res) => {
    const userToken = req.cookies["auth-token"];
    if (!userToken) {
        res.status(401).json({ isAuthorized: false });
    } else {
        try {
            const verification = jwt.verify(
                userToken,
                process.env.JWT_TOKEN_SECRET
            );
            if (verification) {
                res.status(200).json({
                    isAuthorized: {
                        user: verification._id,
                        name: verification.name,
                        email: verification.email,
                        role: verification.role,
                    },
                });
            } else {
                res.status(401).json({ isAuthorized: false });
            }
        } catch (err) {
            res.status(401).json({ isAuthorized: false });
        }
    }
});

// LOGOUT Route - TODO
router.get("/logout", (req, res) => {
    res.cookie("auth-token", { maxAge: 0 }).send("You have been logged out");
});

module.exports = router;
