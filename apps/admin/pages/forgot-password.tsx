import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { authOptions } from "./api/auth/[...nextauth]";

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Forgot Password - Prakash Pun</title>
        <meta name="description" content="Forgot Password Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen min-h-full items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/default/avatar.png`}
              alt="My Company"
            />
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot Password
            </h2>
          </div>
          <form className="mt-8 space-y-4" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  className="block w-full rounded-md border-gray-300 pl-2 pr-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <div className="text-sm">
                <Link href={"/login"}>
                  <a
                    href="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Back to Sign in Page
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {loading ? "Loading..." : "Reset Password"}
              </button>
            </div>
          </form>
          <div>
            <p className="mt-2 text-center text-sm text-gray-500">
              We&lsquo;ll send you an email.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return { props: { session } };
  }

  return {
    props: {},
  };
};

export default ForgotPassword;
