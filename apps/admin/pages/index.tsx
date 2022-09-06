import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { Header, HeaderThree, HeaderTwo, Sidebar } from "ui";
import styles from "../styles/Home.module.scss";
import { requireAuth } from "./api/auth/require-auth";

const Home: NextPage<any> = ({ session }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prakash Pun - Home</title>
        <meta name="description" content="Prakash Pun - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <Sidebar />
        <HeaderTwo />
        <HeaderThree />
        {session && (
          <button
            onClick={() =>
              signOut({ callbackUrl: `${window.location.origin}` })
            }
          >
            Sign Out
          </button>
        )}
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = requireAuth(async (ctx, session) => {
  return { props: { session } };
});
