import axios from "axios";

export const getCheckTheUserName = async (userName: string) => {

    let data = JSON.stringify({
        "userName": userName
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://madadgar.onrender.com/api/auth/resetPassword/userName',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      try {
        const response = await axios(config);
        return response.data;
      } catch (err: any) {
        return err.response.message;
      }
};

export const checkTheBirthdayOfUser = async(userName: string,day:string ,month:string,year:string)=>{
    let data = JSON.stringify({
        "userName": userName,
        "day": day,
        "month": month,
        "year": year
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://madadgar.onrender.com/api/user/userBirthdaycheck/restpassword',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      try {
        const response = await axios(config);
        return response.data;
      } catch (err: any) {
        return err.response.data;
      }
}

export const changepasswordFinalPage = async(userName:string,password:string)=>{
    let data = JSON.stringify({
        "userName": userName,
        "password": password
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://madadgar.onrender.com/api//resetpassword/page/reset',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      try {
        const response = await axios(config);
        return response.data;
      } catch (err: any) {
        return err.response.data;
      }
      
}