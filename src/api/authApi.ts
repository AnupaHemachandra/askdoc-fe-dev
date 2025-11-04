import axiosClient from "./axiosClient";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = [
  {
    access_token: string;
    refresh_token?: string;
  },
  number
];

const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>("/auth/login", data);
    console.log(response);
    return response.data;
  },
  register: async (data: { email: string; password: string; name: string }) => {
    const response = await axiosClient.post("/auth/register", data);
    return response.data;
  },
};

export default authApi;