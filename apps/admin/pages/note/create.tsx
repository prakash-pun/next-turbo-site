import React, { useState } from "react";
import Head from "next/head";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { requireAuth } from "@auth";
import { withDashboard } from "@hoc";

const Create = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  return (
    <>
      <Head>
        <title>New</title>
        <meta name="description" content="Prakash Pun - New Note" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <div>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </>
  );
};

export default withDashboard(Create, true);

export const getServerSideProps = requireAuth(async (ctx, session) => {
  return { props: { session } };
});
