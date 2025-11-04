import axiosClient from "./axiosClient";

export interface SourceNode {
  text: string;
  score: number;
  user_id: string;
  metadata: {
    batch_id: number;
    document_id: number;
    category_id: number;
    page: number;
    url: string;
    user_id: number
  };
}

export interface QueryResponse {
  answer: string;
  source_nodes: SourceNode[];
}

const queryApi = {
  ask: async (query: string, categoryId: number): Promise<QueryResponse> => {
    const res = await axiosClient.post("/query/ask", {
      query,
      category_id: categoryId,
    });
    return res.data;
  },
};

export default queryApi;