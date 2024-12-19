
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Messanger = require('./../models/messanger/messange');
const education = require("./../models/services/education");
const medical = require('./../models/services/medical');
const educationRequest = require("./../models/services_request/educationRequest");
const medicalReports = require("./../models/services_request/medicalRequest")
const Job = require("./../models/services/job");
const JobRequest = require("./../models/services_request/jobRequest");
const Donation = require("./../models/Donation/donationModel");
const DonationRequest = require("./../models/Donation/donationRequestModel");

exports.createMessagesSpace = catchAsyncErrors(
  async (req, res) => {
    try {
      const { servicesId, requestedId, userId, reqUserID } = req.body;
      console.log(reqUserID)
      let findUser = await Messanger.findOne({ userId: userId, reqUserID: reqUserID });
      console.log("find User " + findUser);
      if (findUser) {
        const checkServiceIdInJob = await Job.find({ servicesId });
        let statusfind = false;
        checkServiceIdInJob.forEach((doc) => {
          if (doc._id.toString() === servicesId) {
            statusfind = true;
          }
        })
        if (statusfind) {
          const jobId = servicesId;
          let idExists = false;
          findUser.jobId.map((id) => {
            if (id.toString() == servicesId) {
              idExists = true;
            }
          })
          if (!idExists) {
            findUser.jobId.push(jobId);
            await findUser.save();
          }
          const jobRequestCheck = await JobRequest.findOne({ requestedId })
          if (jobRequestCheck) {
            jobRequestCheck.remove();
          }
        }
        const checkServiceId = await education.find({ servicesId });
        let servicesExists = false;
        checkServiceId.forEach((doc) => {
          if (doc._id.toString() === servicesId) {
            servicesExists = true;
          }
        })
        if (servicesExists) {
          const eduId = servicesId;
          // check the id 
          let idExists = false;
          findUser.eduId.map((id) => {
            if (id.toString() == servicesId) {
              idExists = true;
            }
          })
          if (!idExists) {
            findUser.eduId.push(eduId);
            await findUser.save();
          }
          const educationRequestCheck = await educationRequest.findOne({ requestedId })
          if (educationRequestCheck) {
            educationRequestCheck.remove();
          }
        }
        const checKId = await medical.find({ servicesId });
        let medicalExists = false;
        checKId.forEach(doc => {
          if (doc._id.toString() === servicesId) {
            medicalExists = true;
          }
        })
        if (medicalExists) {
          const medID = servicesId;
          let idExists = false;
          findUser.medID.map((id) => {
            if (id.toString() == servicesId) {
              idExists = true;
            }
          })
          if (!idExists) {
            findUser.medID.push(medID);
            await findUser.save();
          }
          const findMedicalRequest = await medicalReports.findOne({ requestedId });
          console.log(findMedicalRequest);
          if (findMedicalRequest) {
            findMedicalRequest.remove();
          }
        }

        const checkDonId = await Donation.find({ servicesId });
        let donationExists = false;
        checkDonId.forEach(doc => {
          if (doc._id.toString() === servicesId) {
            donationExists = true;
          }
        })
        if (donationExists) {
          const donId = servicesId;
          let idExists = false;
          findUser.donId.map((id) => {
            if (id.toString() == servicesId) {
              idExists = true;
            }
          })
          if (!idExists) {
            findUser.donId.push(donId);
            await findUser.save();
          }
          const findDonationRequest = await DonationRequest.findOne({ requestedId });
          console.log(findDonationRequest);
          if (findDonationRequest) {
            findDonationRequest.remove();
          }
        }
        res.status(200).json({ data: findUser })
      } else {
        console.log("here else condition");
        // education
        const findServicesId = await education.findOne({ _id: servicesId });

        if (findServicesId) {
          const eduId = servicesId;
          // check if the userID exists and the reqUserID doesn't exist
          const findUserByUserID = await Messanger.findOne({ userId: userId });
          console.log("here find by userID" + findUserByUserID);
          if (findUserByUserID && findUserByUserID.reqUserID.toString() == reqUserID) {
            return res.status(200).json({ message: 'Messages space already exists' });
          } else {
            console.log("i am here now");
            const newDocument = await Messanger.create({ userId: userId, reqUserID: reqUserID, eduId: [eduId] });
            const educationRequestCheck = await educationRequest.findOne({ requestedId })
            console.log(educationRequestCheck);
            if (educationRequestCheck) {
              educationRequestCheck.remove();
            }
            res.status(200).json(newDocument);
          }
        }

        // medical
        const fetchMedicalReports = await medical.findOne({ _id: servicesId });
        console.log(fetchMedicalReports);
        if (fetchMedicalReports) {
          const medID = servicesId;
          // check if the userID exists and the reqUserID doesn't exist
          const findUserByUserID = await Messanger.findOne({ userId: userId });
          console.log(findUserByUserID)
          if (findUserByUserID && findUserByUserID.reqUserID.toString() == reqUserID) {
            return res.status(200).json({ message: 'Messages space already exists' });
          } else {
            console.log("not user ID");
            const newDocument = await Messanger.create({ userId: userId, reqUserID: reqUserID, medID: [medID] });
            const findMedicalRequest = await medicalReports.findOne({ requestedId });
            if (findMedicalRequest) {
              findMedicalRequest.remove();
            }
            res.status(200).json(newDocument);
          }
        }


        // job
        const findJobPost = await Job.findOne({ _id: servicesId });
        if (findJobPost) {
          const jobId = servicesId;
          const findUserByUserID = await Messanger.findOne({ userId: userId });
          console.log(findUserByUserID)
          if (findUserByUserID && findUserByUserID.reqUserID.toString() == reqUserID) {
            return res.status(200).json({ message: 'Messages space already exists' });
          } else {
            console.log("not user ID");
            const newDocument = await Messanger.create({ userId: userId, reqUserID: reqUserID, jobId: [jobId] });
            const findMedicalRequest = await JobRequest.findOne({ requestedId });
            if (findMedicalRequest) {
              findMedicalRequest.remove();
            }
            res.status(200).json(newDocument);
          }
        }

        // donation
        const findDonationPost = await Donation.findOne({_id: servicesId});
        if (findDonationPost) {
          const donId = servicesId;
          const findUserByUserID = await Messanger.findOne({ userId: userId });
          console.log(findUserByUserID)
          if (findUserByUserID && findUserByUserID.reqUserID.toString() == reqUserID) {
            return res.status(200).json({ message: 'Messages space already exists' });
          } else {
            console.log("not user ID");
            const newDocument = await Messanger.create({ userId: userId, reqUserID: reqUserID, donId: [donId] });
            const findDonationRequest = await DonationRequest.findOne({ requestedId });
            if (findDonationRequest) {
              findDonationRequest.remove();
            }
            res.status(200).json(newDocument);
          }
        }
      }
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
)
exports.getIDsFromMessagerDB = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const getMessangerIds = await Messanger.find().select("eduId medID userId reqUserID");
      return res.status(200).json(getMessangerIds);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
)

exports.checkTheUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const personId = req.params.personId;
    const matchingMessengers = await Messanger.find({
      $or: [
        { userId: personId },
        { reqUserID: personId }
      ]
    });

    if (matchingMessengers.length === 0) {
      return false;
    }

    const fetchThePostMemberDetails = await Messanger.find({
      personId,
      $or: [
        { userId: personId },
        { reqUserID: personId }
      ]
    })
      .select("eduId userId reqUserID")
      .populate([
        {
          path: "userId",
          select: "fullName userName image",
        },
        {
          path: "reqUserID",
          select: "fullName userName image",
        },
        {
          path: "eduId",
          select: "title",
        },
        {
          path: "medID",
          select: "title",
        },
        {
          path: "chat.sender chat.text chat.createdAt chat._id chat.voiceUrl",
          select: "image fullName",
        },
      ]);

    return res.status(200).json(fetchThePostMemberDetails);
  } catch (err) {
    res.status(400).send(err.message);
  }
});




exports.checkTheUserMedical = catchAsyncErrors(async (req, res, next) => {
  try {
    const personId = req.params.personId;
    const medID = req.params.medID;
    const matchingMessengers = await Messanger.find({ medID });

    if (matchingMessengers.length === 0) {
      return false;
    }

    for (const messenger of matchingMessengers) {
      if (messenger.userId.toString() === personId || messenger.reqUserID.toString() === personId) {
        let query = { medID };
        if (personId === messenger.userId.toString()) {
          query.userId = personId;
        } else {
          query.reqUserID = personId;
        }
        const select = "eduId userId reqUserID";
        const populateOptions = [
          {
            path: "userId",
            select: "fullName userName image",
          },
          {
            path: "reqUserID",
            select: "fullName userName image",
          },
          {
            path: "eduId",
            select: "title",
          },
          {
            path: "chat.sender chat.text chat.createdAt chat._id",
            select: "image fullName",
          },
        ];

        const fetchThePostMemberDetails = await Messanger.find(query)
          .select(select)
          .populate(populateOptions);

        return res.status(200).json(fetchThePostMemberDetails);
      }
    }

    return false;
  } catch (err) {
    res.status(400).send(err.message);
  }
});


exports.chatting = catchAsyncErrors(async (req, res) => {
      const { senderId, messageText } = req.body;
      const { messangeID } = req.params;
      console.log(messangeID);
      try {
        const educationId = await Messanger.findOne({ _id: messangeID });
        if (!educationId) {
          return res.status(404).json({ message: 'No accepted request found' });
        }
        const messageForm = {
          sender: senderId,
          text: messageText
        };
        educationId.chat.push(messageForm);
        await educationId.save();
        return res.status(200).json({ message: educationId });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
});


exports.getChatting = catchAsyncErrors(async (req, res) => {
  const { eduId } = req.params;
  try {
    const messagesCheck = await Messanger.findOne({ eduId })
      .populate({
        path: 'chat.sender',
        select: 'fullName',
      })
      .lean();

    if (!messagesCheck) {
      return res.status(404).json({ message: 'no Accepted Request' });
    }

    let messages = messagesCheck.chat;
    return res.status(200).json({
      chat: messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});