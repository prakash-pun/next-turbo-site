import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { TeamForm, SkeletonLoading } from "@components";
import { handleError, successMessage } from "@helpers";
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
          <TeamForm
            header={`Update Team ${router.query.slug || ""}`}
            loading={loading}
            onSubmit={onSubmit}
            initialData={initialData}
          />
        ) : (
          <SkeletonLoading />
        )}
      </div>
    </>
  );
};

export default withDashboard(UpdateTeam);
