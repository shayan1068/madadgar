import axios from "axios";
import FormData from "form-data";

export const PostDataToDb = async (userId: any, itemType: String, size: string, gender: string, email: string, phone: string, city: string, location: string, description: string, image: string) => {
    let data = new FormData();
    data.append('userId', userId);
    data.append('itemType', itemType);
    data.append('size', size);
    data.append('gender', gender);
    data.append('email', email);
    data.append('phone', phone);
    data.append('city', city);
    data.append('location', location);
    data.append('description', description);
    data.append('image', image);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://madadgar.onrender.com/api/doation/donationItems/userId/${userId}`,
        data: data
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export const getDeailsOfDonationPost = async (userId: any) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://madadgar.onrender.com/api/donation/getDonationPost/${userId}`,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (err) {
        throw err;
    }

}
export const getRequestForDonation = async (userId:string,doId:string,newUserId:string,name:string,gender:string,phone:string,email:string) => {
    let data = JSON.stringify({
      "userId": userId,
      "donationPostId": doId,
      "reqUserID": newUserId,
      "name": name,
      "gender": gender,
      "phone": phone,
      "email": email
    });
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://madadgar.onrender.com/api/request/donation',
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