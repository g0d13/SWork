import httpClient from "./httpClient";

const fetchLogs = async () => {
  const response = await httpClient.get("/api/log");
  return response.data;
};

const fetchLogById = async (id) => {
  const response = await httpClient.get(`/api/log/${id}`);
  return response.data;
};

const postLog = async (data) => {
  const response = await httpClient.post("/api/log", data);
  return response.data;
};

const postLogWithData = async ({ method, data, mechanic, categories }) => {
  const response = await httpClient[method]("/api/log", data);
  const logId = response.data.id;
  return Promise.all([
    await httpClient.post(`/api/log/${logId}/mechanic/${mechanic}`),
    await httpClient.post(`/api/log/${logId}/categories`, categories),
    await httpClient.get(`/api/log/${logId}`),
  ]);
};

const setMechanic = async ({ logId, mechanicId }) => {
  const response = await httpClient.post(
    `/api/log/${logId}/mechanic/${mechanicId}`
  );
  return response.data;
};

const setCategories = async ({ logId, categories }) => {
  const response = await httpClient.post(
    `/api/log/${logId}/categories`,
    categories
  );
  return response.data;
};

const putLog = async (id, data) => {
  const response = await httpClient.put(`/api/log/${id}`, data);
  return response.data;
};

const deleteLog = async (id) => {
  const response = await httpClient.delete(`/api/log/${id}`);
  return response.data;
};

export {
  fetchLogs,
  postLogWithData,
  postLog,
  putLog,
  deleteLog,
  setMechanic,
  setCategories,
  fetchLogById,
};
