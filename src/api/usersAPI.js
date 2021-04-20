import httpClient from "./httpClient";

const fetchUsers = async () => {
  const response = await httpClient.get("/api/user");
  return response.data;
};

const fetchUserById = async (id) => {
  const response = await httpClient.get(`/api/user/${id}`);
  return response.data;
};

const postUser = async (data) => {
  const response = await httpClient.post("/api/user", data);
  return response.data;
};

const putUser = async (id, data) => {
  const response = await httpClient.put(`/api/user/${id}`, data);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await httpClient.delete(`/api/user/${id}`);
  return response.data;
};

export { fetchUserById, fetchUsers, postUser, putUser, deleteUser };
