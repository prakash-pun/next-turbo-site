import React from "react";
import { NewTeamMemberForm } from "@components";
import { withDashboard } from "@hoc";

const UpdateMember = () => {
  return (
    <div>
      <NewTeamMemberForm />
    </div>
  );
};

export default withDashboard(UpdateMember);
