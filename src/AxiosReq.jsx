import axios from "axios";

// const URL = "http://localhost:5000/api/";
const URL = "https://ecommerce-backend-production-4ddd.up.railway.app/api/";

export const publicRequest =axios.create({
    baseURL : URL
})
// export const userRequest = axios.create({
  //   baseURL: URL,
  //   headers: { token: `Bearer ${TOKEN}` },
  // });
  
  
  export const userRequest = () => {
    const ldata = localStorage.getItem("persist:root");
    var TOKEN = "";
    

  if (ldata) {
    if (JSON.parse(JSON.parse(ldata).user).userdata) {
      TOKEN = JSON.parse(JSON.parse(ldata).user).userdata.accesstoken;
    }
  }
  return axios.create({
    baseURL: URL,
    headers: { token: `Bearer ${TOKEN}` },
  });
};