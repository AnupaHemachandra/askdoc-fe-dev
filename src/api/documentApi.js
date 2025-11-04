import axiosClient from "./axiosClient";
const documentApi = {
    generatePresignedUrls: async (fileNames, categoryId) => {
        const response = await axiosClient.post("/document/generate-presigned", {
            files: fileNames,
            category_id: categoryId,
        });
        console.log(response);
        return response.data.urls;
    },
    updateStatuses: async (updates) => {
        await axiosClient.patch("/document/update-file-status", {
            files: updates,
        });
    },
    getAllByCategory: async (categoryId) => {
        const res = await axiosClient.get(`/document/category/${categoryId}`);
        return res.data.documents || res.data; // handle if backend returns {"documents": [...]}
    },
};
export default documentApi;
