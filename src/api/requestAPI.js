import httpClient from "./httpClient";

const makeRequest = async ({ logId, ...data }) => {
  const response = await httpClient.post(`/api/log/${logId}/request`, data);
  return response.data;
};

export { makeRequest };
