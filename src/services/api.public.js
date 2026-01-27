import axios from "axios";
import API_BASE_URL from "./api.base";

// Axios instance
const publicAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    
    Accept: "application/json",
  },
});

// Public
export const getProducts = async () => {
  const res = await publicAxios.get("/Products");
  return res.data;
};

export const getProductById = async (id) => {
  const res = await publicAxios.get(`/Products/${id}`);
  return res.data;
};

export const searchProducts = async (q) => {
  const res = await publicAxios.get(`/Products/search`, {
    params: { query: q },
  });
  return res.data;
};

export const getCategories = async () => {
  const res = await publicAxios.get("/Categories");
  return res.data;
};
