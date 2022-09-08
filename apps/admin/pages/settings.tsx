import React from "react";
import { ProfileForm } from "../components";
import { withDashboard } from "../hoc";

const Settings = () => {
  return (
    <div>
      <ProfileForm />
    </div>
  );
};

export default withDashboard(Settings);
