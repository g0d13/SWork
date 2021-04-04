import httpClient from "./httpClient";

async function getMachines() {
  const { data } = await httpClient.get("/api/machine");
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getMachines };
