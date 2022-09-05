export interface GetApiDataResponse {
  name?: string;
  status: "success" | "failure";
  data: any;
}

export interface ApiParameters {
  endpoint?: string | string[];
  name: string;
  session: any;
  type?: string;
  params?: any;
  data?: {
    [key: string]: any;
  };
}
export interface IUser {
  avatar?: string;
  bio?: string;
  created_at?: string;
  email?: string;
  email_verified?: boolean;
  full_name?: string;
  github_username?: string;
  is_active?: boolean;
  linkedln_username?: string;
  location?: string;
  updated_at?: string;
  user_type?: number;
  username?: string;
  website?: string;
}

export interface IUserContext {
  user: IUser;
  loadingInitial: boolean;
  setUser: (val: IUser) => void;
  setUserToggle: (bool: boolean) => void;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  authLoading: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  handleLogout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactChild;
}
