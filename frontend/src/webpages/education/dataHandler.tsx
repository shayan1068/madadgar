import axios from "axios";
import FormData from "form-data";
export const exportDataFromRequest = async (userId: string, image: string,title:string, fullName: string, fatherName: string, gender: string, className: string, email: string, phone: string, city: string, location: string, describe: string) => {
  // console.log(image,fullName,fatherName,gender,className,email,phone,city,location,describe);
  let data = new FormData();
  data.append('userId', userId);
  data.append('image', image);
  data.append('title',title);
  data.append('fullName', fullName);
  data.append('fatherName', fatherName);
  data.append('gender', gender);
  data.append('class', className);
  data.append('email', email);
  data.append('phone', phone);
  data.append('city', city);
  data.append('location', location);
  data.append('description', describe);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://madadgar.onrender.com/api//file/uploadfileEducation/${userId}`,

    data: data
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    throw err;
  }
}

export const fetchTheTotalEducationCollectionPost = async (userId: string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://madadgar.onrender.com/api/getAllPost/education/user/${userId}`,
    headers: {}
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export const getRequestForEducationHelp = async (userId:string,edId:string,newUserId:string,name:string,gender:string,phone:string,email:string) => {
  let data = JSON.stringify({
    "userId": userId,
    "educationPostId": edId,
    "reqUserID": newUserId,
    "name": name,
    "gender": gender,
    "phone": phone,
    "email": email
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://madadgar.onrender.com/api/post/requestbyuser/education',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (err:any) {
    throw err.response.data.message;
  }
}