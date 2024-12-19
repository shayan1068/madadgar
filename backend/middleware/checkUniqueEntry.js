
const Registration = require('./../models/Registration');
 const checkUnique = async (req, res, next) => {
  const { userName, email } = req.body;
    const existingUser = await Registration.findOne({
        userName:userName
    })
    if (existingUser) {

      return res.status(400).json({status:"error", error: 'Username already exists' });
    }
    const existingEmail = await Registration.findOne({
        email: email
    })
    if(existingEmail){

        return res.status(400).json({status:"error", error: 'Email already exists'})
    }
    
    next();

  // try {
  //   const { userName, email } = req.body;
  //   console.log(req.body)
  //   const existingUser = await Registration.findOne({
  //       where: { userName:userName}
  //   })
  //   console.log(existingUser);
  //   if (existingUser) {
  //     return res.status(400).json({ error: 'Username already exists' });
  //   }
  //   const existingEmail = await Registration.findOne({
  //       where: { email: email}
  //   })
  //   if(existingEmail){
  //       return res.status(200).json({ error: 'Email already exists'})
  //   }
  //   next();
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).json({ error: 'Server error' });
  // }
};
module.exports = checkUnique
