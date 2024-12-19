const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/profile'); // Store in public/images/profile directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Use unique filename with original extension
    }
  });
  exports.defaultProfilePicture = '../images/profile/default.png';
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images only!');
      }
    }
  }).single('profilePicture');

  module.exports=upload