import { ApiParameters, GetApiDataResponse } from "../interfaces";
import { AxiosRequestConfig } from "axios";
import { getApiPath, getData, patchData, postData } from "./base.service";

const refreshToken = async (): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "auth",
  });
  const api = `${apiPath}/token-refresh`;
  try {
    const token = localStorage.getItem("refreshToken");
    const data = {
      refreshToken: token,
    };
    const response = await postData(api, data);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "failure",
      data: error,
    };
  }
};

const getProfile = async (repo: ApiParameters): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "auth",
  });

  const api = `${apiPath}/user/`;
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

const updateProfile = async (
  repo: ApiParameters
): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "auth",
  });

  const api = `${apiPath}/user/`;
  try {
    const token = repo?.data?.session;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const profileResponse = await patchData(api, repo.data, config);

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

export { refreshToken, getProfile, updateProfile };
