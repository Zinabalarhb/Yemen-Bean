import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://localhost:7189/api";

// Axios instance (للـ Auth فقط)
const authAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// Auth APIs
// ===============================

// Admin Login
export const adminLogin = async (email, password) => {
  try {
    const res = await authAxios.post("/Auth/login", { email, password });

    const data = res.data;

    // حفظ التوكن
    localStorage.setItem("token", data.token);
    Cookies.set("token", data.token, {
      secure: true,
      sameSite: "strict",
      expires: 7, // أيام
    });

    return data;
  } catch (err) {
    // Axios error handling
    if (err.response) {
      throw new Error(err.response.data || "فشل تسجيل الدخول");
    }
    throw new Error(err.message || "فشل تسجيل الدخول");
  }
};

// Logout
export const adminLogout = () => {
  localStorage.removeItem("token");
};

// Check Auth
export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("token");
};
