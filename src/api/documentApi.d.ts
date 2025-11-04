export interface PresignedUrl {
    batch_id: string;
    category_id: number;
    expires_in: number;
    filename: string;
    method: string;
    url: string;
    user_id: string;
}
export interface FileStatusUpdate {
    filename: string;
    status: "UPLOADED" | "UPLOAD_FAILED";
}
export interface DocItem {
    id: number;
    name: string;
    file_type: string;
    url: string;
    size?: string;
    status: string;
    category_id: number;
    created_at?: string;
}
declare const documentApi: {
    generatePresignedUrls: (fileNames: string[], categoryId: number) => Promise<PresignedUrl[]>;
    updateStatuses: (updates: FileStatusUpdate[]) => Promise<void>;
    getAllByCategory: (categoryId: number) => Promise<DocItem[]>;
};
export default documentApi;
