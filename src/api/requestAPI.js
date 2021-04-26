import httpClient from "./httpClient";

const makeRequest = async ({ logId, ...data }) => {
  const response = await httpClient.post(`/api/request/new/${logId}`, data);
  return response.data;
};

const getRequests = async () => {
  const response = await httpClient.get("/api/request");
  return response.data;
};

const postRepair = async ({ requestId, ...data }) => {
  const response = await httpClient.post(`/api/repair/${requestId}`, data);
  return response.data;
};

export { makeRequest, getRequests, postRepair };
