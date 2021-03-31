import httpClient from "./httpClient";

async function getLogs() {
  const { data } = await httpClient.get("/api/log");
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getLogs,
};
