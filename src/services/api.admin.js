import axios from "axios";
import API_BASE_URL from "./api.base";

const requestAdmin = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("🚫 غير مسموح: التوكن غير موجود. الرجاء تسجيل الدخول.");
  }

  try {
    const res = await axios({
      url: `${API_BASE_URL}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    });

    return res.data;
  } catch (err) {
    // Axios error handling
    if (err.response) {
      // Server returned a response
      throw new Error(err.response.data || "حدث خطأ في الطلب");
    } else {
      // Network error
      throw new Error(err.message || "حدث خطأ في الطلب");
    }
  }
};

/* ===== Products ===== */
export const createProduct = (data) =>
  requestAdmin("/Products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token", data.token)}`,
      "Content-Type": "application/json",
    },
    data,
  });

export const updateProduct = (id, data) =>
  requestAdmin(`/Products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data,
  });

export const deleteProduct = (id) =>
  requestAdmin(`/Products/${id}`, { method: "DELETE" });

export const uploadImage = (file) => {
  const fd = new FormData();
  fd.append("file", file);

  return requestAdmin("/Products/upload", {
    method: "POST",
    data: fd,
  });
};

/* ===== Categories ===== */
export const getCategories = () => requestAdmin("/Categories");

export const createCategory = (data) =>
  requestAdmin("/Categories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token", data.token)}`,
      "Content-Type": "application/json",
    },
    data,
  });

export const updateCategory = (id, data) =>
  requestAdmin(`/Categories/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token", data.token)}`,
      "Content-Type": "application/json",
    },
    data,
  });

export const deleteCategory = (id) =>
  requestAdmin(`/Categories/${id}`, { method: "DELETE" });

/* ===== Orders ===== */
export const getOrders = () => requestAdmin("/Orders");

export const updateOrderStatus = (id, status) =>
  requestAdmin(`/Orders/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: { status },
  });

export const deleteOrder = (id) =>
  requestAdmin(`/Orders/${id}`, { method: "DELETE" });

export const createOrder = (data) =>
  requestAdmin("/Orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data,
  });

/* ===== Users (AuthController) ===== */
export const getUsers = () => requestAdmin("/Auth");

export const deleteUser = (id) =>
  requestAdmin(`/Auth/${id}`, { method: "DELETE" });

 

export const createUser = (data) =>
   requestAdmin("/Auth", {
   method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token", data.token)}`,
      "Content-Type": "application/json",
    },
    data,
});