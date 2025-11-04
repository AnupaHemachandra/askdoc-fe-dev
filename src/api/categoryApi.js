import axiosClient from "./axiosClient";
const categoryApi = {
    getAll: async () => {
        const res = await axiosClient.get("/category/");
        console.log(res);
        return res.data;
    },
    create: async (data) => {
        const res = await axiosClient.post("/category/", data);
        return res.data;
    },
    delete: async (id) => {
        await axiosClient.delete(`/category/${id}`);
    },
};
export default categoryApi;
