// const backendDomin = "http://localhost:3000";

// const SummaryApi = {
//   signUP: {
//     url: `${backendDomin}/api/signup`,
//     method: "post",
//   },

//   signIN: {
//     url: `${backendDomin}/api/signin`,
//     method: "post",
//   },

//   current_user : {
//     url: `${backendDomin}/api/userdetails`,
//     method:"get",
//   },
//   logout_user :{
//     url:`${backendDomin}/api/userLogout`,
//     method:"get",
//   }
// };

// export default SummaryApi;



// Read backend URL from Vite environment variable
const backendDomin = import.meta.env.VITE_API_PATH;

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/signup`,
    method: "post",
  },

  signIN: {
    url: `${backendDomin}/signin`,
    method: "post",
  },

  current_user: {
    url: `${backendDomin}/userdetails`,
    method: "get",
  },

  logout_user: {
    url: `${backendDomin}/userLogout`,
    method: "get",
  },
};

export default SummaryApi;





