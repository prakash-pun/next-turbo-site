import React from "react";
import Head from "next/head";
import { SettingForm } from "@components";
import { withDashboard } from "@hoc";

const Settings = () => {
  return (
    <>
      <Head>
        <title>Settings - Prakash Pun</title>
        <meta name="description" content="Settings - Prakash Pun" />
        <meta name="keywords" content="Prakash Pun's Settings" />
      </Head>
      <div>
        <SettingForm />
      </div>
    </>
  );
};

export default withDashboard(Settings);
