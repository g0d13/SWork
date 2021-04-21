import httpClient from "./httpClient";

const fetchMachines = async () => {
  const response = await httpClient.get("/api/machine");
  return response.data;
};

const fetchMachineBId = async (id) => {
  const response = await httpClient.get(`/api/machine/${id}`);
  return response.data;
};

const postMachine = async (machine) => {
  const response = await httpClient.post("/api/machine", machine);
  return response.data;
};

const putMachine = async (id, machine) => {
  const response = await httpClient.put(`/api/machine/${id}`, machine);
  return response.data;
};

const deleteMachine = async (id) => {
  const response = await httpClient.delete(`/api/machine/${id}`);
  return response.data;
};

export {
  fetchMachines,
  fetchMachineBId,
  postMachine,
  putMachine,
  deleteMachine,
};
