import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { handleError, successMessage } from "@helpers";
import { getSingleTeam, updateTeam } from "@services";
import { NewTeamForm } from "@components";
import { withDashboard } from "@hoc";

const UpdateTeam = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<any>({});
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const getTeam = async () => {
      const payload = {
        name: "Get Team",
        endpoint: router.query.slug,
        session: session,
      };
      const response = await getSingleTeam(payload);
      if (response.status === "success") {
        setInitialData(response.data);
        setDataLoading(false);
        setLoading(false);
      } else {
        handleError(response.data);
        setDataLoading(false);
        setLoading(false);
      }
    };
    if (session && router.query.slug && router.query.slug.length >= 1) {
      getTeam();
    }
  }, [router.query.slug, session]);

  const onSubmit = async (_data: ITeam, fn: () => void) => {
    setLoading(true);
    const payload = {
      name: "Update New Team",
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
  );
};

export default withDashboard(UpdateTeam);
