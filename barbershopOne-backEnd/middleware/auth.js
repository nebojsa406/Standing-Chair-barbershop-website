const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const rateLimit = require('express-rate-limit');
const User = require("../models/user");

const browseLimiter = rateLimit({
    windowMs: 30 * 1000, // time window: 30sec, in milliseconds
    max: 90,
    message: "too many attempts, try again later"
});

const crudLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // time window: 3min, in milliseconds
    max: 10,
    message: "too many attempts, try again later"
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // time window: 15min, in milliseconds
    max: 5,
    message: "too many attempts, try again later"
});

function createTokens(user) {
    const refreshToken = jwt.sign(
        {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role
        },
        REFRESH_TOKEN_SECRET,
        {expiresIn: "14d"}
    );
    const accessToken = jwt.sign(
        {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role
        },
        ACCESS_TOKEN_SECRET,
        {expiresIn: "15 minutes"}
    );
    return {accessToken: accessToken,refreshToken: refreshToken};
};

function createAccessToken(user) {
    const accessToken = jwt.sign(
        {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role
        },
        ACCESS_TOKEN_SECRET,
        {expiresIn: "15 minutes"}
    );
    return accessToken;
}


function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({message: "authentication required"});
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) return res.status(401).json({message: "invalid or expired token"});
        req.user = data;
        next();
    });
};

async function authenticateRefreshToken(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({message: "refresh token required"});
        
        const sessionLookUp = await User.find({"sessions.refreshToken": refreshToken}, {"sessions.$": 1});
        if (sessionLookUp.length === 0) return res.status(401).json({message: "invalid or expired refresh token"});

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
            if(err) return res.status(401).json({message: "invalid or expired refresh token"});
            req.user = data;
            next();
        });
    } catch (err) {
        next(err);
    }
}

function requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({message: "administrator access required"});
    }
   next();
}

module.exports = {browseLimiter, loginLimiter, crudLimiter, createTokens, createAccessToken, authenticateRefreshToken, authenticateAccessToken, requireAdmin};