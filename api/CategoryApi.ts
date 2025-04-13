import apiClient from "./apiClient";

export const getCategoryApi = () => {
  return apiClient.get("/categories");
};

export const getCategoryChildApi = (
  category: string,
  params: { type: string; amount: number }
) => {
  return apiClient.get(`/joke/${category}`, { params });
};
