import { ApiParameters, GetApiDataResponse } from "../interfaces";
import { AxiosRequestConfig } from "axios";
import { getApiPath, getData } from "./base.service";

const listTeams = async (repo: ApiParameters): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team/prakashpun/`;
  try {
    const token = repo?.session.access;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const profileResponse = await getData(api, config);

    return {
      name: repo.name,
      status: "success",
      data: profileResponse.data,
    };
  } catch (error: any) {
    return {
      name: repo.name,
      status: "failure",
      data: error.response,
    };
  }
};

export { listTeams };
