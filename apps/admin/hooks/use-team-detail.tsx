import { useEffect, useState } from "react";
import { handleError } from "@helpers";
import { getSingleTeam } from "@services";

export const useTeamDetail = (session: any, slug: any) => {
  const [dataLoading, setDataLoading] = useState(true);
  const [initialData, setInitialData] = useState<any>({});

  useEffect(() => {
    const getTeam = async () => {
      const payload = {
        name: "Get Team",
        endpoint: slug,
        session: session,
      };
      const response = await getSingleTeam(payload);
      if (response.status === "success") {
        setInitialData(response.data);
        setDataLoading(false);
      } else {
        handleError(response.data);
        setDataLoading(false);
      }
    };
    if (session && slug && slug.length >= 1) {
      getTeam();
    }
  }, [session, slug]);

  return { dataLoading, initialData };
};
