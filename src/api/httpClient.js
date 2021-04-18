import axios from "axios";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "https://192.168.8.113:5001";
} else {
  axios.defaults.baseURL = "https://sworkapif.herokuapp.com";
}

// eslint-disable-next-line import/no-anonymous-default-export
export default axios;
