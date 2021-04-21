import httpClient from "./httpClient";

const login = async (data) => {
  let response;
  try {
    response = await httpClient.post("/api/auth/login", data);
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message);
  }
  const token = response.data.token;
  httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const whoami = async () => {
  const response = await httpClient.get("/api/auth/whoami");
  return response.data;
};

export { login, whoami };
