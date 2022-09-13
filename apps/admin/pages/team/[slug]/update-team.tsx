import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { handleError, successMessage } from "@helpers";
import { NewTeamForm } from "@components";
import { updateTeam } from "@services";
import { useTeamDetail } from "@hooks";
import { withDashboard } from "@hoc";

const UpdateTeam = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const { dataLoading, initialData } = useTeamDetail(
    session,
    router.query.slug
  );

  const onSubmit = async (_data: ITeam, fn: () => void) => {
    setLoading(true);
    const payload = {
      name: "Update Team",
      data: _data,
      session: session,
      endpoint: router.query.slug,
    };
    const response = await updateTeam(payload);
    if (response.status === "success") {
      setLoading(false);
      successMessage("Team Updated Successfully!");
      router.push("/team");
      fn();
    } else {
      handleError(response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Update Team - Prakash Pun</title>
        <meta name="description" content="Prakash Pun Update Team Page" />
      </Head>
      <div>
        {!dataLoading ? (
          <NewTeamForm
            header={`Update Team ${router.query.slug || ""}`}
            loading={loading}
            onSubmit={onSubmit}
            initialData={initialData}
          />
        ) : (
          <div className="mx-auto my-2 rounded-md border border-blue-800 p-4 shadow">
            <div className="flex animate-pulse space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 h-4 w-40 rounded bg-slate-700"></div>
                    <div className="col-span-2 h-4 w-40 rounded bg-slate-700"></div>
                    <div className="col-span-2 h-4 w-40 rounded bg-slate-700"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2 h-10 rounded bg-slate-700"></div>
                    <div className="col-span-2 h-10 rounded bg-slate-700"></div>
                  </div>
                  <div className="h-2 w-40 rounded bg-slate-700"></div>
                  <div className="h-10 rounded bg-slate-700"></div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-4">
                    <div className=" col-span-4 h-8 w-24 rounded bg-slate-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default withDashboard(UpdateTeam);
