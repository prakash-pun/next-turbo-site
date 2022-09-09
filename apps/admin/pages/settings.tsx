import React from "react";
import { SettingForm } from "../components";
import { withDashboard } from "../hoc";

const Settings = () => {
  return (
    <div>
      <SettingForm />
    </div>
  );
};

export default withDashboard(Settings);
