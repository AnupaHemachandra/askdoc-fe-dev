import axiosClient from "./axiosClient";

export interface Category {
  id: number;
  name: string;
  description?: string;
  file_count?: number;
  status?: string;
  user_id?: number;
}

const categoryApi = {
  getAll: async (): Promise<{ categories: Category[] }> => {
    const res = await axiosClient.get("/category/");
    console.log(res)
    return res.data;
  },

  create: async (data: { name: string; description: string }) => {
    const res = await axiosClient.post("/category/", data);
    return res.data;
  },

  delete: async (id: number) => {
    await axiosClient.delete(`/category/${id}`);
  },
};

export default categoryApi;