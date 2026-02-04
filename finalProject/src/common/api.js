
import axios from 'axios';

const api = axios.create({
  baseURL:'http://localhost:3000/auth'
});
export const googleAuth =(code) => api.get(`/google?code=${code}`)



// import axios from 'axios';

// const api = axios.create({
//      baseURL: "https://challenge.jaipurbestfurniture.shop/api",    //if i will run this application on domain
//   // baseURL:'http://localhost:3000/auth'        //if my application running on localhost
//   // baseURL:'http://13.203.220.54:31000/api'    //if my application running on this port


//        withCredentials: true,
// });
// export const googleAuth =(code) => api.get(`/google?code=${code}`)