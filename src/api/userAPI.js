import httpClient from "./httpClient";

async function getUsers() {
  const { data } = await httpClient.get("/api/users");
  return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsers,
};
