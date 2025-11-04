declare module "react-pdf" {
  import * as React from "react";

  export interface DocumentProps {
    file: string | File | ArrayBuffer;
    onLoadSuccess?: (pdf: { numPages: number }) => void;
    onLoadError?: (error: any) => void;
    children?: React.ReactNode;
  }

  export interface PageProps {
    pageNumber: number;
    scale?: number;
    width?: number;
    renderAnnotationLayer?: boolean;
    renderTextLayer?: boolean;
  }

  export const Document: React.FC<DocumentProps>;
  export const Page: React.FC<PageProps>;
  export const pdfjs: any;
}