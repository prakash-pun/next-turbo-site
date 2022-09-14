import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { handleError, successMessage } from "@helpers";
import { TeamMemberForm } from "@components";
import { addTeamMember } from "@services";
import { withDashboard } from "@hoc";

const INITIALDATA = {
  member_name: "",
  position: "",
};

const AddMember = () => {
  const [loading, setLoading] = useState(false);
  const { data: _session } = useSession();
  const router = useRouter();

  const onSubmit = async (_data: ITeamMember, fn: () => void) => {
    setLoading(true);
    const payload = {
      name: "Add Team Member",
      data: _data,
      session: _session,
      endpoint: router.query.slug,
    };

    const response = await addTeamMember(payload);
    if (response.status === "success") {
      setLoading(false);
      successMessage("Team Member Added Successfully!");
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
        <title>Add Member - Prakash Pun</title>
      </Head>
      <div>
        <TeamMemberForm
          initialData={INITIALDATA}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </>
  );
};

export default withDashboard(AddMember);
