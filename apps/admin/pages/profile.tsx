import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ProfileTab } from "@components";
import { UserContext } from "@context";
import { withDashboard } from "@hoc";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Profile - Prakash Pun</title>
        <meta name="description" content="Profile - Prakash Pun" />
        <meta name="keywords" content="Prakash Pun's Profile" />
      </Head>
      <div className="mt-6 h-[calc(100vh-89px)] pb-2 md:grid md:grid-cols-5 md:gap-12">
        <div className="flex w-full flex-col items-center md:col-span-1 md:items-stretch">
          <div className="h-28 w-28 rounded-full bg-slate-100 ring-2 ring-white">
            <Image
              src={user.avatar || ""}
              alt={"avatar"}
              height={112}
              width={112}
              loading={"lazy"}
            />
          </div>
          <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 dark:sm:text-white md:text-2xl">
            {user.full_name}
          </h1>
          <p className="py-1 text-sm font-medium leading-4 text-white sm:text-slate-500 dark:sm:text-slate-400">
            {user.username}
          </p>
          <div className="mt-2">
            <Link href={"/settings"} legacyBehavior>
              <a
                href={"/settings"}
                className="flex justify-center rounded-md border p-2 text-center"
              >
                <span className="text-center text-base font-medium text-gray-200 hover:text-gray-400">
                  Edit Profile
                </span>
              </a>
            </Link>
          </div>
        </div>

        <div className="mt-5 md:col-span-4 md:mt-0">
          <ProfileTab />
        </div>
      </div>
    </>
  );
};

export default withDashboard(Profile, true);
