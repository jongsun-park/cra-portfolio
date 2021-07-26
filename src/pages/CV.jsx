/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useState } from "react";
import { Inner } from "../compoenents/container";
import { Button } from "../compoenents/button";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const CV = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Inner>
      <PDFContainer>
        <Button
          href="/Jongsun Park CV.pdf"
          downlaod="Jongsun Park"
          target="_blank"
        >
          DOWNLOAD RESUME
        </Button>
        <Document
          file="/Jongsun Park CV.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </PDFContainer>
    </Inner>
  );
};

const PDFContainer = styled.div`
  text-align: right;
  .react-pdf__Document {
    .react-pdf__Page {
      overflow: hidden;
      .react-pdf__Page__canvas,
      .react-pdf__Page__textContent {
        max-width: 100%;
        object-fit: contain;
        height: auto !important;
      }
    }
  }
`;
