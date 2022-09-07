import React from "react";
import { signOut } from "next-auth/react";
import { Header, Sidebar } from "ui";

const withDashboard = (WrappedComponent: React.ComponentType) => {
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
          <div className="bg-gr max-w- mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
            <Sidebar />
            <div className="mt-3 w-full">
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
