const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {loginLimiter, createTokens, createAccessToken, authenticateRefreshToken } = require("../middleware/auth");

//login
router.post("/login", loginLimiter, async (req, res) => {
    try {
        if (!req.body || typeof req.body.email !== "string" || typeof req.body.password !== "string") {
            return res.status(400).json({message: "email and password are required"});
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ message: "invalid credentials" });
        const userObj = user.toObject();
        
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(401).json({ message: "invalid credentials" });
        
        const newTokens = createTokens(user);
        const { refreshToken, accessToken } = newTokens;
        
        const expiresAt = new Date(Date.now() + 14*24*60*60*1000);//14 days
        
        user.sessions.push({refreshToken: refreshToken, expiresAt: expiresAt});
        await user.save();

        const { password, sessions, ...userFiltered } = userObj;

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 14*24*60*60*1000
        });

        res.status(200).json({ accessToken, user: userFiltered });
    } catch (err) {
        throw err;
    }
});

//logout
router.post("/logout", async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const session = await User.updateOne(
            {"sessions.refreshToken": refreshToken},
            { $pull: {sessions: {refreshToken: refreshToken} } } //pull out of sessions array by refresh token match
        );
        res.clearCookie("refreshToken");
        res.status(200).json({message: "session removed!"});
    } catch (err) {
        throw err;
    }
});

//refresh for new access token
router.post("/refresh", authenticateRefreshToken, async(req, res) => {
    try {
        const newAccessToken = createAccessToken(req.user);
        res.status(200).json({accessToken: newAccessToken});
    } catch (err) {
        throw err;
    }
});

module.exports = router;