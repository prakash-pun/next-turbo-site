import { getSession } from "next-auth/react";

export const sessionGet = async (req: any) => {
  const session = await getSession({ req });
  return session;
};
