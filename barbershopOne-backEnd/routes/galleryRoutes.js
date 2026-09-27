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
router.get("/", browseLimiter, async (req, res, next) => {
    try {
        const photos = await Photo.find();
        if (!photos.length) return res.status(404).json({ message: "no photos found" });
        return res.status(200).json(photos);
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
});

//create
router.post("/", crudLimiter, authenticateAccessToken, requireAdmin, upload.single("image"), async (req, res, next) => {
    try {
        const image = req.file;
        console.log(req.file);
        const category = req.body.category;

        if (!image) return res.status(400).json({ message: "image file is required" });
        if (!category || typeof category !== "string" || !category.trim()) {
            return res.status(400).json({ message: "category is required" });
        }

        const photoBody = new Photo({
            category: category.trim(),
            imageUrls: [],
            imagePublicIds: []
        });

        const type = await fileTypeFromBuffer(image.buffer);
        if (!type || !type.mime.startsWith("image/")) return res.status(400).json({ message: "invalid file type" });

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "photos"
                },
                (error, uploadResult) => {
                    if (error) reject(error);
                    else resolve(uploadResult)
                }
            );
            stream.end(image.buffer);
        });

        if (!result || !result.secure_url || !result.public_id) {
            return res.status(500).json({ message: "image upload failed" });
        }

        photoBody.imageUrls.push(result.secure_url);
        photoBody.imagePublicIds.push(result.public_id);

        const savedPhoto = await photoBody.save();
        return res.status(200).json({ message: "successfuly uploaded image!", url: savedPhoto.imageUrls });
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
})

//delete
router.delete("/:id", crudLimiter, authenticateAccessToken, requireAdmin, async (req, res, next) => {    try {
        const photo = await Photo.findById(req.params.id);
        if(!photo) return res.status(404).json({message: "no photo with matching id found in db"});

        if (Array.isArray(photo.imagePublicIds) && photo.imagePublicIds.length) {
            for (let i = 0; i < photo.imagePublicIds.length; i++) {
                await cloudinary.uploader.destroy(photo.imagePublicIds[i]);
                console.log("success, cloudinary photo deleted at INDEX: ", i);
            }
        }

        await Photo.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "photo deleted successfuly" });
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router;