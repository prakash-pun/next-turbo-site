import type { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

type RequireAuth = (ctx: GetServerSidePropsContext, session: any) => void;

export const requireAuth =
  (func: RequireAuth) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
    );
    if (!session) {
      return {
        redirect: {
          destination: "/login", // login path
          permanent: false,
        },
      };
    }

    return await func(ctx, session);
  };
