interface Props {
    categoryId: number;
}
interface Props {
    categoryId: number;
    onSourceClick: (source: {
        score: number;
        page: number;
        text: string;
        user_id: number;
        metadata: {
            batch_id: number;
            category_id: number;
            document_id: number;
            page: number;
            url: string;
            user_id: number;
        };
    }) => void;
}
declare const QueryInterface: React.FC<Props>;
export default QueryInterface;
