import React from "react";
import { ProfileForm } from "../components";
import { withDashboard } from "../hoc";

const Profile = () => {
  return (
    <div>
      <ProfileForm />
    </div>
  );
};

export default withDashboard(Profile);
