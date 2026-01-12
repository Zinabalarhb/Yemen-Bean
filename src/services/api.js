const API_BASE_URL = "https://localhost:7189/api"; // عدّلي الرقم حسب عندك

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/Products`);
  if (!response.ok) {
    throw new Error("فشل تحميل المنتجات");
  }
  return response.json();
}
