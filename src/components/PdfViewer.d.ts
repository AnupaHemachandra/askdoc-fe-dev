import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
interface Props {
    fileUrl: string;
    pageNumber?: number;
}
declare const PdfViewer: React.FC<Props>;
export default PdfViewer;
