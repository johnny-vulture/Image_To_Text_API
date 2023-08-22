const Tesseract = require("tesseract.js");

// Define a function to perform OCR on an image file
const path = require("path");

const [, , imagePath] = process.argv;
const image = path.resolve(
  __dirname,
  imagePath || "../../tests/assets/images/cosmic.png"
);

console.log(`Recognizing ${image}`);

Tesseract.detect(image, { logger: (m) => console.log(m) }).then(({ data }) => {
  console.log(data);
});
module.exports = {
  performOCR,
};
