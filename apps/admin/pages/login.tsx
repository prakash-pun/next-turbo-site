import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import toast, { Toaster } from "react-hot-toast";
import { authOptions } from "./api/auth/[...nextauth]";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const [data, setdata] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: `/`,
      redirect: false,
    });
    setLoading(false);
    if (response?.error) {
      toast.error(response.error);
    }
    if (response?.ok) {
      router.push("/");
    }
  };

  const disabled = data.email === "" || data.password === "";

  return (
    <>
      <Head>
        <title>Login - Prakash Pun</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-4 flex h-screen">
        <div className="container mx-auto my-auto w-4/12 content-between rounded-lg bg-white px-6 py-4 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800">
          <form onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-2 block text-base font-medium tracking-tight text-slate-900 dark:text-white">
                Email Address
              </span>

              <input
                type="text"
                value={data.email}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none
    "
                onChange={(e) => setdata({ ...data, email: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="mt-4 mb-2 block text-base font-medium tracking-tight text-slate-900 dark:text-white">
                Password
              </span>

              <input
                type="password"
                value={data.password}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none
    "
                onChange={(e) => setdata({ ...data, password: e.target.value })}
              />
            </label>
            <button
              className="mt-6 h-10 w-full rounded-md bg-black px-6 font-semibold text-white"
              type="submit"
              disabled={disabled}
            >
              {loading ? "Loading..." : "Sign in to account"}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
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

export default Login;
