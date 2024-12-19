require('dotenv').config();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
exports.uploadImages= catchAsyncErrors(
  async(req, res, next) =>{
    const files = [];
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    for (const file of req.files) {
      files.push(`${baseUrl}/images/${file.filename}`);
    }
    res.status(200).json(files);
  }
)