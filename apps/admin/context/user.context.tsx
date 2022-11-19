import React, { useState, useEffect, useMemo } from "react";
import { IUser, IUserContext, AuthProviderProps } from "../interfaces";
import { getProfile } from "../services";
import { useSession } from "next-auth/react";

const USER_INITIAL: IUserContext = {
  user: {},
  loadingInitial: true,
  setUser: () => {},
  setUserToggle: () => {},
};

const UserContext = React.createContext<IUserContext>(USER_INITIAL);

const UserProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>({});

  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [userToggle, setUserToggle] = useState<boolean>(false);
  const { data: session }: any = useSession();

  useEffect(() => {
    if (session?.access) {
      if (Object.keys(user).length <= 0) {
        const getUserDetail = async (): Promise<any> => {
          const payload = {
            name: "Get User",
            session,
          };
          const profile = await getProfile(payload);
          if (profile.status === "success") {
            setUser(profile?.data);
            setUserToggle(false);
          } else {
            setLoadingInitial(false);
          }
        };
        getUserDetail();
      } else {
        setLoadingInitial(false);
      }
    } else {
      setLoadingInitial(false);
    }
  }, [session, user, userToggle]);

  const value = useMemo(
    () => ({
      user,
      loadingInitial,
      setUser,
      setUserToggle,
    }),
    [user, loadingInitial]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
