import axios from "axios";
import io from "socket.io-client";
import FormData from "form-data";
const socket = io('https://madadgar.onrender.com');
export const getTheuserIdsFromRequest = async (servicesId: string, userId: string, reqUserID: string, postId: string) => {
   let data = JSON.stringify({
      "servicesId": servicesId,
      "userId": userId,
      "reqUserID": reqUserID,
      "requestedId": postId
   });

   let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://madadgar.onrender.com/api/messanger/messanges',
      headers: {
         'Content-Type': 'application/json'
      },
      data: data
   };
   try {
      const response = await axios(config);
      return response.data;
   } catch (err) {
      throw err;
   }
}

// export const showUserThatChatStarted = async (eduId: string, userId: string, reqUserID: string) => {
//    let config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: `https://madadgar.onrender.com/api/messanger/eduId/${eduId}/user/${userId}/reqUser/${reqUserID}`,
//       headers: {}
//    };

//    try {
//       const response = await axios(config);
//       return response.data;
//    } catch (err) {
//       throw err;
//    }
// }
// export const showUserThatChatStartedMedical = async (medID: string, userId: string, reqUserID: string) => {
//    let config = {
//       method: 'get',
//       maxBodyLength: Infinity,
//       url: `https://madadgar.onrender.com/api/messanger/eduId/${medID}/user/${userId}/reqUser/${reqUserID}`,
//       headers: {}
//    };

//    try {
//       const response = await axios(config);
//       return response.data;
//    } catch (err) {
//       throw err;
//    }
// }
export const fetchDataFromRequestToGetIds = async () => {
   let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://madadgar.onrender.com/api/getIDs/messanger/data',
      headers: {}
   };
   try {
      const response = await axios(config);
      return response.data;
   } catch (err) {
      throw err;
   }
}
export const getTheDetailAboutTheUser = async (personId: string) => {
   let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://madadgar.onrender.com/api/messanger/getData/person/${personId}`,
      headers: {}
   };

   try {
      const response = await axios(config);
      return response.data;
   } catch (err) {
      throw err;
   }

}



export const storeChatinMongoDB = async (sendId: string, messageText: string, messangeID: string) => {
   console.log(sendId, messageText, messangeID);
   let data = JSON.stringify({
      "senderId": sendId,
      "messageText": messageText
   });
   let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://madadgar.onrender.com/api/chat/messangerSchemaId/${messangeID}`,
      headers: {
         'Content-Type': 'application/json'
      },
      data: data
   };

   try {
      const response = await axios(config);
      socket.emit("message", { sendId, messageText: messageText, messangeID });
      return response.data;
   } catch (err) {
      throw err;
   }
}

export const sendVoiceNoteToDb = async (personID:string,messageID:string,blob:Blob) => {
   let data = new FormData();
   data.append('recording', blob, 'recording.wav');

   let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://madadgar.onrender.com/api/chat/messangerSchemaId/voice/${messageID}/user/${personID}`,
      data: data
   };

   try {
      const response = await axios(config);
      socket.emit("new-voice-note", data);
      return response.data;
   } catch (err) {
      throw err;
   }

}