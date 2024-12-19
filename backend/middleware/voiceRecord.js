const multer = require('multer');
const Registration = require("./../models/Registration");
const fs = require('fs');
const path = require('path');
const fileStorageEngine = multer.diskStorage({
    destination: async (req, files, cb) => {
        try {
            console.log("i am here");
            const checkuser = await Registration.findById(req.params.senderId);
            console.log(checkuser);
            if (!checkuser) {
                cb(new Error("user not found"));
            }
            const folderName = checkuser.userName.replace(/\s+/g, "-").toLowerCase();
            console.log(folderName);
            const finalName = path.join(__dirname, "..", "recording", req.params.messangeID, "messanger", folderName);
            console.log(finalName);
            if (!fs.existsSync(finalName)) {
                fs.mkdirSync(finalName, { recursive: true })
            }
            cb(null, finalName)
        } catch (err) {
            cb(err.message);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

module.exports = multer({ storage: fileStorageEngine });