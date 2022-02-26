const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.cookies["auth-token"];
    if (!token)
        return res.status(401).send("Access denied. No token provided.");

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET); // payload is returned
        req.user = verified; // we are setting the user to the payload, it contains the user id and the iat
        next();
    } catch (err) {
        return res.status(400).send("Invalid token.");
    }
}

module.exports = verifyToken;
