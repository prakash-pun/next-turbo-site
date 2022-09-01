import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

const URL = "https://aanay.pythonanywhere.com/media/default/Prakash_Pun.pdf";

export const PdfViewer: React.FC = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Document file={URL}>
      <Page pageNumber={1} />
    </Document>
  );
};
