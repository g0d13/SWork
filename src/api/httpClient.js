import axios from "axios";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:3030";
} else {
  axios.defaults.baseURL = "https://nodeswork.herokuapp.com";
}
const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user == null) {
    return "";
  }
  return user.token;
};

axios.interceptors.request.use(
  (config) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// eslint-disable-next-line import/no-anonymous-default-export
export default axios;
