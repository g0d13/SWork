import httpClient from "./httpClient";

const fetchCategories = async () => {
  const response = await httpClient.get("/api/category");
  return response.data;
};

const postCategorory = async (data) => {
  const response = await httpClient.post("/api/category", data);
  return response.data;
};

const putCategorory = async (id, data) => {
  const response = await httpClient.put(`/api/category/${id}`, data);
  return response.data;
};

const deleteCategorory = async (id) => {
  const response = await httpClient.delete(`/api/category/${id}`);
  return response.data;
};

export { fetchCategories, postCategorory, putCategorory, deleteCategorory };
