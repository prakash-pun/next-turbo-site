import { AxiosRequestConfig } from "axios";
import { ApiParameters, GetApiDataResponse } from "@interfaces";
import {
  deleteData,
  getApiPath,
  getData,
  patchData,
  postData,
} from "./base.service";

const getTeamMember = async (
  repo: ApiParameters
): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team-member-detail/${repo?.endpoint}/`;
  try {
    const token = repo?.session.access;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const response = await getData(api, config);

    return {
      name: repo.name,
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      name: repo.name,
      status: "failure",
      data: error,
    };
  }
};

const addTeamMember = async (
  repo: ApiParameters
): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team-member/${repo.endpoint}/`;
  try {
    const token = repo?.session.access;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const response = await postData(api, repo.data, config);

    return {
      name: repo.name,
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      name: repo.name,
      status: "failure",
      data: error,
    };
  }
};

const updateTeamMember = async (
  repo: ApiParameters
): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team-member-detail/${repo.endpoint}/`;
  try {
    const token = repo?.session.access;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const response = await patchData(api, repo.data, config);

    return {
      name: repo.name,
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      name: repo.name,
      status: "failure",
      data: error,
    };
  }
};

const deleteTeamMember = async (
  repo: ApiParameters
): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team-member-detail/${repo.endpoint}/`;
  try {
    const token = repo?.session.access;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    const response = await deleteData(api, config);

    return {
      name: repo.name,
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      name: repo.name,
      status: "failure",
      data: error,
    };
  }
};

export { getTeamMember, addTeamMember, updateTeamMember, deleteTeamMember };
