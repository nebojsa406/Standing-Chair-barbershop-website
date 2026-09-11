const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { fileTypeFromBuffer } = require("file-type");
const { crudLimiter, browseLimiter, authenticateAccessToken, requireAdmin } = require('../middleware/auth');

const Photo = require("../models/photo.js");

const upload = multer({
    storage: multer.memoryStorage()
})

//get 
router.get("/", browseLimiter, async (req, res) => {
    try {
        const photo = await Photo.find();
        if (!photo) return res.status(404).json({ message: "no photos found" })
        res.status(200).json(photo);
    } catch (err) {
        throw err
    }
});

//create
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const image = req.file;

        if (!image) return res.status(400).json({ message: "image file is required" });

        const photoBody = new Photo({
            category: req.body.category
        });

        const type = await fileTypeFromBuffer(image.buffer);
        if (!type || !type.mime.startsWith("image/")) return res.status(400).json({ message: "invalid file type" });

        //this
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "parts"
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result)
                }
            );
            stream.end(file.buffer);
        });

        part.imageUrls.push(result.secure_url)
        part.imagePublicIds.push(result.public_id);
        //this

        const newPhoto = photoBody.save();
        res.status(200).json({ message: "successfuly uploaded image!" })
    } catch (err) {
        throw err
    }
})
//update

//delete

module.exports = router;