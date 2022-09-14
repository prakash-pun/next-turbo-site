import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { SkletonLoading } from "@components";
import { useTeamDetail } from "@hooks";
import { withDashboard } from "@hoc";

const TeamDetail = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { dataLoading, initialData } = useTeamDetail(
    session,
    router.query.slug
  );

  return (
    <>
      <Head>
        <title>Team Detail - Prakash Pun</title>
        <meta name="description" content="Prakash Pun Team Detail" />
      </Head>
      {!dataLoading ? (
        <div className="mt-4">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-gray-700 px-4 py-5 sm:p-6">
              <article className="flex items-start space-x-4 p-4">
                <div className="relative min-w-0 flex-auto">
                  <h2 className="truncate pr-20 font-semibold text-slate-900">
                    {initialData.team_name}
                  </h2>
                  <dl className="mt-2 flex flex-wrap text-sm font-medium leading-6">
                    <div className="w-full flex-none font-normal">
                      <dt className="sr-only">Website</dt>
                      <dd className="text-slate-400">{initialData.website}</dd>
                    </div>
                  </dl>
                </div>
              </article>
              <ul className="divide-y divide-slate-100">
                {initialData && initialData.team_members.length
                  ? initialData.team_members.map((data: any) => (
                      <article className="flex items-start space-x-4 p-4">
                        <img
                          src={data.avatar}
                          alt=""
                          width="60"
                          height="88"
                          className="flex-none rounded-md bg-slate-100"
                        />
                        <div className="relative min-w-0 flex-auto">
                          <h2 className="truncate pr-20 font-semibold text-slate-900">
                            {data.member_name}
                          </h2>
                          <dl className="mt-2 flex flex-wrap text-sm font-medium leading-6">
                            <div className="absolute top-0 right-0 flex items-center space-x-1">
                              <dt className="text-sky-500">
                                <span className="sr-only">Star rating</span>
                                <svg width="16" height="20" fill="currentColor">
                                  <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                                </svg>
                              </dt>
                              <dd>{data.position}</dd>
                            </div>
                            <div className="w-full flex-none font-normal">
                              <dt className="sr-only">Website</dt>
                              <dd className="text-slate-400">
                                {data.position}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </article>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <SkletonLoading />
      )}
    </>
  );
};

export default withDashboard(TeamDetail);
