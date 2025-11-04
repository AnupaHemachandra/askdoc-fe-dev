import { jsx as _jsx } from "react/jsx-runtime";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
const PdfViewer = ({ fileUrl, pageNumber }) => {
    return (_jsx("div", { style: { width: '100%', height: '100%' }, children: _jsx(Document, { file: fileUrl, children: _jsx(Page, { pageNumber: pageNumber }) }) }));
};
export default PdfViewer;
