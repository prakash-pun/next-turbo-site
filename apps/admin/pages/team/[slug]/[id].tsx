import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { TeamMemberForm, SkeletonLoading } from "@components";
import { getTeamMember, updateTeamMember } from "@services";
import { handleError, successMessage } from "@helpers";
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

  const onSubmit = async (_data: ITeamMember, fn: () => void) => {
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
      successMessage("Team Member Updated Successfully!");
      router.push("/team");
      fn();
    } else {
      handleError(response.data);
      setLoading(false);
    }
  };

  const onChangeAvatar = async (_data: ITeamMember) => {
    const payload = {
      name: "Update Team Member",
      data: _data,
      session: session,
      endpoint: router.query.id,
    };
    const response = await updateTeamMember(payload);
    if (response.status === "success") {
      successMessage("Avatar Updated Successfully!");
    } else {
      handleError(response.data);
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
          <TeamMemberForm
            initialData={initialData}
            onSubmit={onSubmit}
            onChangeAvatar={onChangeAvatar}
            header={"Update Team"}
            loading={loading}
          />
        ) : (
          <SkeletonLoading />
        )}
      </div>
    </>
  );
};

export default withDashboard(UpdateMember);
