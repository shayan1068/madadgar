require('dotenv').config();
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const Messanger = require("./../models/messanger/messange")
const Registration = require("./../models/Registration");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
// exports.storeRecording = catchAsyncErrors(async (req, res, next) => {

//   console.log("req.file:", req.file);
//   // Check if file exists in request
//   if (!req.file) {
//     console.log("No file uploaded");
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   // Create a new filename with a random string and the original file extension
//   const filename = `${Date.now()}-${Math.random().toString(36).substring(2)}${req.file.originalname.substring(req.file.originalname.lastIndexOf("."))}`;
//   console.log("filename:", filename);

//   // Upload the file to Firebase Storage
//   const file = bucket.file(filename);
//   const fileStream = file.createWriteStream();
//   fileStream.end(req.file.buffer);
//   fileStream.on("error", (error) => {
//     console.error(error);
//     res.status(500).json({ error: "Failed to upload file" });
//   });
//   fileStream.on("finish", async () => {
//     // Get the public URL for the file
//     const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
//     console.log(`File uploaded to Firebase Storage. URL: ${fileUrl}`);
//     const { senderId } = req.body;
//     const { messangeID } = req.params;
//     try {
//       const educationId = await Messanger.findOne({ messangeID });
//       if (!educationId) {
//         return res.status(404).json({ message: 'no accepted request found' });
//       }
//       const messageForm = {
//         sender: senderId,
//         voiceUrl: fileUrl
//       };
//       educationId.chat.push(messageForm);
//       educationId.save()
//       return res.status(200).json({ message: messageForm });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   });
// });

exports.storeRecording = catchAsyncErrors(async (req, res, next) => {
  console.log("i am here in controller");
  const { messangeID, senderId } = req.params;
  console.log("req.file:", req.file);
  // Check if file exists in request
  if (!req.file) {
    console.log("No file uploaded");
    return res.status(400).json({ error: "No file uploaded" });
  }
  const checkuser = await Registration.findById(senderId);
  if (!checkuser) {
    res.status(400).send("User not found");
  }
  const folderName = checkuser.userName.replace(/\s+/g, "-").toLowerCase();
  console.log(folderName);
  const finalName = path.join(__dirname, "..", "recording", messangeID, "messanger", folderName);
  console.log(finalName);
  if (!fs.existsSync(finalName)) {
    fs.mkdirSync(finalName, { recursive: true })
  }
  const storage = multer.diskStorage({
    destination: finalName,
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/recording/${messangeID}/messanger/${folderName}/${req.file.filename}`;
  console.log(url)
  try {
    const educationId = await Messanger.findOne({ messangeID });
    if (!educationId) {
      return res.status(404).json({ message: 'no accepted request found' });
    }
    const messageForm = {
      sender: senderId,
      voiceUrl: url
    };
    educationId.chat.push(messageForm);
    educationId.save()
    return res.status(200).json({ message: messageForm });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }

});

