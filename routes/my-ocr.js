const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Tesseract = require("tesseract.js");

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

router.get("/addPic", function (req, res, next) {
  res.render("ocr", {});
});

router.post("/upload", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  console.log(`Recognizing ${imagePath}`);

  try {
    const { data } = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m),
    });

    console.log(data);
    res.json({ text: data.text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
