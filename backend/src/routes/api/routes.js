const express = require("express");
const multer = require("multer");
const uploadController = require("../../controllers/upload");
const questionController = require("../../controllers/question");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single("file"), uploadController);
router.post('/question', questionController);

module.exports = router;