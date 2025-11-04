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
        user_id: number;
    };
}
export interface QueryResponse {
    answer: string;
    source_nodes: SourceNode[];
}
declare const queryApi: {
    ask: (query: string, categoryId: number) => Promise<QueryResponse>;
};
export default queryApi;
