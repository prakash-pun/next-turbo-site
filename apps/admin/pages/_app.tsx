import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../context";
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
