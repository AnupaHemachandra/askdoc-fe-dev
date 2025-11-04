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
declare const authApi: {
    login: (data: LoginRequest) => Promise<LoginResponse>;
    register: (data: {
        email: string;
        password: string;
        name: string;
    }) => Promise<any>;
};
export default authApi;
