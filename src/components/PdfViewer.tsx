import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface Props {
  fileUrl: string;
  pageNumber?: number;
}

const PdfViewer: React.FC<Props> = ({ fileUrl, pageNumber }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Document
        file={fileUrl}
      >
        <Page pageNumber={pageNumber as number} />
      </Document>
    </div>
  );
};

export default PdfViewer;