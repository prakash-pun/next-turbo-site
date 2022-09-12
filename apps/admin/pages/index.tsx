import type { NextPage } from "next";
import Head from "next/head";
import { withDashboard } from "@hoc";
import styles from "../styles/Home.module.scss";
import { requireAuth } from "@auth";

const Home: NextPage<any> = ({ session }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Prakash Pun - Home</title>
        <meta name="description" content="Prakash Pun - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto max-w-7xl py-2 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default withDashboard(Home);

export const getServerSideProps = requireAuth(async (ctx, session) => {
  return { props: { session } };
});
