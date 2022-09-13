type ITeamMember = {
  id?: number;
  member_name: string;
  position: string;
  team?: number;
  avatar?: string;
  website?: string;
  github_username?: string;
  linkedln_username?: string;
  created_at?: string;
  updated_at?: string;
};

type ITeam = {
  id?: number;
  team_name: string;
  website: string;
  description: string;
  slug?: string;
  owner?: number;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  team_members?: ITeamMember[];
};

type IAddEditTeam = {
  header?: string;
  initialData: ITeam;
  loading: boolean;
  onSubmit: (data: ITeam, fn: () => void) => void;
};

type IAddEditTeamMember = {
  header?: string;
  initialData: ITeamMember;
  loading: boolean;
  onSubmit: (data: ITeamMember, fn: () => void) => void;
};

type ITeamProps = {
  teams?: ITeam[];
};
