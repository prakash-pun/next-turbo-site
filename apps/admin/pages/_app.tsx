import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../context";

import "nprogress/nprogress.css"; //styles of nprogress

//Route Events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <UserProvider>
        <>
          <Component {...pageProps} />
          <Toaster />
        </>
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
