import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { authOptions } from "./api/auth/[...nextauth]";

const SignIn: NextPage = () => {
  const router = useRouter();
  const [data, setdata] = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);
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

  return (
    <>
      <Head>
        <title>Login - Prakash Pun</title>
        <meta name="description" content="Login Page" />
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
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleLogin}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    value={data.email}
                    className="block w-full rounded-md border-gray-300 pl-2 pr-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                    onChange={(e) =>
                      setdata({ ...data, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={visible ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={data.password}
                    className="block w-full rounded-md border-gray-300 pl-2 pr-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder=""
                    onChange={(e) =>
                      setdata({ ...data, password: e.target.value })
                    }
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center hover:cursor-pointer"
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? (
                      <EyeSlashIcon className="h-10 w-10 border-transparent bg-transparent py-0 pl-2 pr-2 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-10 w-10 border-transparent bg-transparent py-0 pl-2 pr-2 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
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
                {loading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>
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

export default SignIn;
