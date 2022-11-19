import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { handleError, successMessage } from "@helpers";
import { TeamForm } from "@components";
import { addNewTeam } from "@services";
import { withDashboard } from "@hoc";
import Head from "next/head";

const INITIALDATA = {
  team_name: "",
  website: "",
  description: "",
};

const CreateTeam = () => {
  const [loading, setLoading] = useState(false);
  const { data: _session } = useSession();
  const router = useRouter();

  const onSubmit = async (_data: ITeam, fn: () => void) => {
    setLoading(true);
    const payload = {
      name: "Add New Team",
      data: _data,
      session: _session,
    };
    const response = await addNewTeam(payload);
    if (response.status === "success") {
      setLoading(false);
      successMessage("Team Created Successfully!");
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
        <title>Create Team - Prakash Pun</title>
        <meta name="description" content="Prakash Pun Create Team Page" />
      </Head>
      <div>
        <TeamForm
          initialData={INITIALDATA}
          loading={loading}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default withDashboard(CreateTeam);
