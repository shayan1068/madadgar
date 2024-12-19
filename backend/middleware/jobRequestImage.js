const multer = require('multer');
const Registration = require("./../models/Registration");
const fs = require('fs');
const path = require('path');
const fileStorageEngine = multer.diskStorage({
	destination: async(req,files,cb)=>{
        try{
            const checkuser = await Registration.findById(req.params.newUserId);
        if(!checkuser){
            cb(new Error("user not found"));
        }
        const folderName = checkuser.userName.replace(/\s+/g,"-").toLowerCase();
        const finalName = path.join(__dirname,"..","images","jobRequest",folderName);
        if(!fs.existsSync(finalName)){
           fs.mkdirSync(finalName,{recursive:true})
        }
        cb(null,finalName)
        }catch(err){
            cb(err.message);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      }
});

module.exports=multer({ storage: fileStorageEngine });