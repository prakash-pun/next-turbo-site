import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getTeamMember, updateTeamMember } from "@services";
import { handleError, successMessage } from "@helpers";
import { NewTeamMemberForm } from "@components";
import { withDashboard } from "@hoc";

const UpdateMember = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<any>({});
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const getTeam = async () => {
      const payload = {
        name: "Get Team",
        endpoint: router.query.id,
        session: session,
      };
      const response = await getTeamMember(payload);
      if (response.status === "success") {
        setInitialData(response.data);
        setDataLoading(false);
      } else {
        handleError(response.data);
        setDataLoading(false);
      }
    };
    if (session && router.query.id && router.query.id.length >= 1) {
      getTeam();
    }
  }, [router.query.id, session]);

  const onSubmit = async (_data: any, fn: () => void) => {
    delete _data.avatar;
    setLoading(true);
    const payload = {
      name: "Update Team Member",
      data: _data,
      session: session,
      endpoint: router.query.id,
    };
    const response = await updateTeamMember(payload);
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
        <title>Update Team Member - Prakash Pun</title>
        <meta
          name="description"
          content="Prakash Pun Create Team Member Page"
        />
      </Head>
      <div>
        {!dataLoading ? (
          <NewTeamMemberForm
            initialData={initialData}
            onSubmit={onSubmit}
            header={"Update Team"}
            loading={loading}
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

export default withDashboard(UpdateMember);
