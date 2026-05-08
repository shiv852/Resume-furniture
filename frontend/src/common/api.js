import axios from "axios";

// Create axios instance using Vite env variable
const api = axios.create({
  // check this baseurl for more details finalproject/.env.docker
  baseURL: `${import.meta.env.VITE_API_PATH}/auth`,
  withCredentials: true,
});

// Google OAuth request
export const googleAuth = (code) =>
  api.get(`/google?code=${code}`);




// import axios from 'axios';

// const api = axios.create({
//   baseURL:'http://localhost:3000/auth'
// });
// export const googleAuth =(code) => api.get(`/google?code=${code}`)



