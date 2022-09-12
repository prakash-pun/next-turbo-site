import React from "react";
import { withDashboard } from "@hoc";
import { NewTeamMemberForm } from "@components";

const AddMember = () => {
  return (
    <div>
      <NewTeamMemberForm />
    </div>
  );
};

export default withDashboard(AddMember);
