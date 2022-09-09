import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { requireAuth } from "../api/auth/require-auth";
import { listTeams } from "../../services";
import { TeamAvatar } from "ui";
import { withDashboard } from "../../hoc";
import { Dropdown, SlideOver } from "../../components";

const Teams: NextPage<any> = ({ teams }) => {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Head>
        <title>Prakash Pun - Home</title>
        <meta name="description" content="Prakash Pun - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <header className="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-200">Teams</h2>
              <a
                href="/new"
                className="group flex items-center rounded-md bg-blue-500 py-2 pl-2 pr-3 text-sm font-medium text-white shadow-sm hover:bg-blue-400"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  aria-hidden="true"
                >
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
                New
              </a>
            </div>
            <form className="group relative">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="pointer-events-none absolute left-3 top-1/2 -mt-2.5 text-slate-400 group-focus-within:text-blue-500"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                />
              </svg>
              <input
                className="w-full appearance-none rounded-md py-2 pl-10 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                aria-label="Filter Teams"
                placeholder="Filter Teams..."
              />
            </form>
          </header>
          <ul className="grid grid-cols-1 gap-4 p-4 text-sm leading-6 sm:grid-cols-2 sm:px-8 sm:pt-6 sm:pb-8 lg:grid-cols-1 lg:p-4 xl:grid-cols-2 xl:px-8 xl:pt-6 xl:pb-8">
            {teams && teams?.length
              ? teams.map((data: any) => (
                  <li key={data.id}>
                    <a
                      onClick={handleOpen}
                      href="#"
                      className="group flex w-full flex-col rounded-md border-2 border-slate-300 p-3 py-3 text-sm font-medium leading-6 text-slate-900 shadow-sm ring-1 ring-slate-200 hover:border-solid hover:border-blue-500  hover:bg-blue-500 hover:shadow-md hover:ring-blue-500"
                    >
                      <dl className="grid grid-cols-2 grid-rows-1 items-center">
                        <div>
                          <dt className="sr-only">{data.team_name}</dt>
                          <dd className="font-semibold text-slate-100 group-hover:text-white">
                            {data.team_name}
                          </dd>
                        </div>
                        <div className="col-start-2 row-start-1 ">
                          <dt className="sr-only">dropdown</dt>
                          <dd className="flex justify-end group-hover:text-blue-200">
                            <Dropdown />
                          </dd>
                        </div>
                        <div>
                          <dt className="sr-only">Category</dt>
                          <dd className="group-hover:text-blue-200">
                            {data.description || "this is it"}
                          </dd>
                        </div>
                        <div className="col-start-2 row-start-2 row-end-3 sm:mt-4 lg:mt-0 xl:mt-2">
                          <dt className="sr-only">Users</dt>
                          <dd className="flex justify-end">
                            <TeamAvatar teamMembers={data.team_members} />
                          </dd>
                        </div>
                      </dl>
                    </a>
                  </li>
                ))
              : null}
            <li className="flex">
              <a
                href="/new"
                className="group flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 py-3 text-sm font-medium leading-6 text-slate-50 hover:border-solid hover:border-blue-500 hover:bg-white hover:text-blue-500"
              >
                <svg
                  className="mb-1 text-slate-400 group-hover:text-blue-500"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
                New Team
              </a>
            </li>
          </ul>
        </section>
        <SlideOver open={open} setOpen={handleOpen} />
      </main>
    </>
  );
};

export default withDashboard(Teams);

export const getServerSideProps = requireAuth(async (ctx, session) => {
  const response = await listTeams({ name: "List Team", session });

  const teams = response?.data;
  return { props: { session, teams } };
});
