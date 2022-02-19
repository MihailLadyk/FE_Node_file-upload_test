const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const { Show } = require("../models");

// Створіть змінні для шляхів до папки uploads/thumbnails та public/thumbnails
const uploadThumbnailsDir = path.join(__dirname, "../../uploads/thumbnails");
const publicThumbnailsDir = path.join(__dirname, "../../public/thumbnails");
// Створіть та налаштуйте сховище для multer
// Додайте генерацію унікальної назви файла
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadThumbnailsDir);
  },
  filename: (req, file, cb) => {
    const newFilename = `${new Date().getTime()}_${file.originalname}`;
    cb(null, newFilename);
  },
});

// Створіть мідлвер для завантажень
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576 * 5,
  },
});
const router = express.Router();

// Застосуйте мідлвер для обробки одного файла в полі thumbnail
/*
  title: string,
  description: string,
  releasedAt: date,
  thumbnail: file
*/
router.post("/", upload.single("thumbnail"), async (req, res) => {
  try {
    // Перемістіть файл з папки завантажень до папки thumbnails
    const newPath = path.join(publicThumbnailsDir, req.file.filename);
    await fs.rename(req.file.path, newPath);

    const newShow = await Show.create({
      title: req.body.title,
      description: req.body.description,
      releasedAt: req.body.releasedAt,
      thumbnailUrl: req.file.filename, // Назва файлу
    });

    res.json(newShow);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
