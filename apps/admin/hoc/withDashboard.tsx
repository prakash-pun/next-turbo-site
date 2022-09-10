import React from "react";
import { signOut } from "next-auth/react";
import { Header, Sidebar } from "../components";
import { classNames } from "utils";

const withDashboard = (
  WrappedComponent: React.ComponentType,
  isProfile?: boolean
) => {
  class WithDashboard extends React.Component {
    constructor(props: {} | Readonly<{}>) {
      super(props);
    }

    handleSignout = () => {
      signOut({ callbackUrl: `${window.location.origin}` });
    };

    render(): React.ReactNode {
      return (
        <div className="bg-gray-800">
          <Header signOut={this.handleSignout} />
          <div
            className={classNames(
              isProfile ? "grid grid-cols-5" : "md:grid md:grid-cols-5",
              "mx-auto grid max-w-7xl grid-cols-5 px-4 sm:px-6 md:gap-2 lg:px-8"
            )}
          >
            {!isProfile && (
              <div className="md:col-span-1">
                <Sidebar />
              </div>
            )}
            <div className={`mt-3 md:col-span-${isProfile ? "5" : "4"}`}>
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </div>
      );
    }
  }

  return WithDashboard;
};

export { withDashboard };
