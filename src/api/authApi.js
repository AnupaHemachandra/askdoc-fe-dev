import axiosClient from "./axiosClient";
const authApi = {
    login: async (data) => {
        const response = await axiosClient.post("/auth/login", data);
        console.log(response);
        return response.data;
    },
    register: async (data) => {
        const response = await axiosClient.post("/auth/register", data);
        return response.data;
    },
};
export default authApi;
