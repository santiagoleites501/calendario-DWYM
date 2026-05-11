
const API_URL = "http://localhost:3000";

export const fetchMonths = async () => {
  const res = await fetch(`${API_URL}/months`);
  const data = await res.json();
  return data;
};

export const updateMonth = async (id, monthData) => {
  const res = await fetch(`${API_URL}/months/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(monthData),
  });
  return res.json();
};