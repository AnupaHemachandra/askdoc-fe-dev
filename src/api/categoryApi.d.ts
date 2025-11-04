export interface Category {
    id: number;
    name: string;
    description?: string;
    file_count?: number;
    status?: string;
    user_id?: number;
}
declare const categoryApi: {
    getAll: () => Promise<{
        categories: Category[];
    }>;
    create: (data: {
        name: string;
        description: string;
    }) => Promise<any>;
    delete: (id: number) => Promise<void>;
};
export default categoryApi;
