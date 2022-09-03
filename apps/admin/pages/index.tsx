import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

// import { requireAuth } from "./api/auth/require-auth";

// export const getServerSideProps = requireAuth(async (ctx) => {
//   return { props: {} };
// });

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prakash Pun - Home</title>
        <meta name="description" content="Prakash Pun - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://prakashpun.com.np"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
