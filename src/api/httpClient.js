import axios from "axios";

axios.defaults.baseURL = process.env.SERVER_URL;

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
