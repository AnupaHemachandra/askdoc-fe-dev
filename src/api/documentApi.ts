import axiosClient from "./axiosClient";

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

const documentApi = {
  generatePresignedUrls: async (
    fileNames: string[],
    categoryId: number
  ): Promise<PresignedUrl[]> => {
    const response = await axiosClient.post("/document/generate-presigned", {
      files: fileNames,
      category_id: categoryId,
    });
    console.log(response);
    return response.data.urls;
  },

  updateStatuses: async (updates: FileStatusUpdate[]) => {
    await axiosClient.patch("/document/update-file-status", {
      files: updates,
    });
  },

  getAllByCategory: async (categoryId: number): Promise<DocItem[]> => {
    const res = await axiosClient.get(`/document/category/${categoryId}`);
    return res.data.documents || res.data; // handle if backend returns {"documents": [...]}
  },
};

export default documentApi;