import axios from 'axios';
export const fetchPostData = async (id: any) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://madadgar.onrender.com/api/edit/post/serviceId/${id}`,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    return err.response.message;
  }
}
export const updateDataOfPost = async (
  title: string,
  email: string,
  phone: number,
  city: string,
  location: string,
  description: string
) => {
  const data = JSON.stringify({
    title: title,
    email: email,
    phone: phone,
    city: city,
    location: location,
    description: description
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://madadgar.onrender.com/api/update/detail/post/serviceId/6460baf19847487955ad3ef1',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (err: any) {
    return err.response.message;
  }
};
