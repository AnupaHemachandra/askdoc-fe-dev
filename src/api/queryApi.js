import axiosClient from "./axiosClient";
const queryApi = {
    ask: async (query, categoryId) => {
        const res = await axiosClient.post("/query/ask", {
            query,
            category_id: categoryId,
        });
        return res.data;
    },
};
export default queryApi;
