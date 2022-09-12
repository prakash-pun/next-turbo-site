import "../styles/globals.scss";
import React, { Fragment } from "react";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "nprogress/nprogress.css"; //styles of nprogress
import { UserProvider } from "@context";

//Route Events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <UserProvider>
        <Fragment>
          <Component {...pageProps} />
          <Toaster />
        </Fragment>
      </UserProvider>
    </SessionProvider>
  );
};

export default App;
