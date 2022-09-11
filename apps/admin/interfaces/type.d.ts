type ITeam = {
  team_name: string;
  website: string;
  description: string;
};

type IAddEditTeam = {
  header?: string;
  initialData: ITeam;
  loading: boolean;
  onSubmit: (data: ITeam, fn: () => void) => void;
};
