const multer = require('multer');
const path = require('path');
const fs = require('fs');

const profileImagesDir = 'images/profile';
if (!fs.existsSync(profileImagesDir)) {
  fs.mkdirSync(profileImagesDir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, profileImagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

module.exports = multer({ storage: fileStorageEngine });
