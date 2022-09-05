import React from "react";
import Head from "next/head";
import { PdfViewer } from "../components";

const Resume = () => {
  return (
    <>
      <Head>
        <title>Resume - Prakash Pun</title>
        <meta name="description" content="Prakash Pun Resume" />
        <link rel="icon" href="favicon.ico" />
        <meta
          name="keywords"
          content="Prakash Pun, PrakashPun, prakashpun, prakash pun, Prakash Pun Resume"
        />
      </Head>
      <div className="resume">
        <PdfViewer />
      </div>
    </>
  );
};

export default Resume;
