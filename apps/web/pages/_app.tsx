import "../styles/globals.scss";
import React from "react";
import type { AppProps } from "next/app";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
