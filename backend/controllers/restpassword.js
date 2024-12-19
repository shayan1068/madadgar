const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Registration = require('../models/Registration');
const bcrypt = require("bcryptjs")

exports.getUserName = catchAsyncErrors(
  async (req, res) => {
    const { userName } = req.body; 
    console.log(userName);
    try {
      const checkUserName = await Registration.findOne({ userName }).select("_id userName");
      if (checkUserName) {
        return res.status(200).json({ status: "success", data: checkUserName });
      }
      return res.status(400).json({ status: "error", message: "not found" });
    } catch (err) {
      return res.status(500).send('An error occurred while finding the user name.');
    }
  }
);

exports.getBirthday = catchAsyncErrors(
  async (req, res) => {
    const {userName,day,month,year} = req.body; 
    console.log(userName);
    try {
      const checkUserName = await Registration.findOne({ userName });
      if (checkUserName) {
        if( checkUserName.birthday[0].day==day &&  checkUserName.birthday[0].month == month &&  checkUserName.birthday[0].year == year){
          return res.status(200).json({ status: "success"});
        }
        return res.status(404).json({ status: "error",message:"please check again and enter your birthday carefully"});
      }
      return res.status(400).json({ status: "error", message: "not found" });
    } catch (err) {
      return res.status(500).send('An error occurred while finding the user name.');
    }
  }
);
exports.changePassword = catchAsyncErrors(async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await Registration.findOne({ userName });
    if (user) {
      const hashedPassword = bcrypt.hashSync(password, 8);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ status: "success" });
    }
    return res.status(404).json({ status: "error", message: "User not found" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: "An error occurred while finding the user" });
  }
});


