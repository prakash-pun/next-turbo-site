import { AxiosRequestConfig } from "axios";
import { ApiParameters, GetApiDataResponse } from "@interfaces";
import {
  deleteData,
  getApiPath,
  getData,
  patchData,
  postData,
} from "./base.service";

const listTeams = async (repo: ApiParameters): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team/`;
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

const addNewTeam = async (repo: ApiParameters): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/create-team/`;
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

const updateTeam = async (repo: ApiParameters): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team-detail/${repo.endpoint}/`;
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

const getSingleTeam = async (
  repo: ApiParameters
): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team-detail/${repo.endpoint}`;
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

const deleteTeam = async (repo: ApiParameters): Promise<GetApiDataResponse> => {
  const apiPath = getApiPath({
    apiRoute: "service",
  });

  const api = `${apiPath}/team-detail/${repo.endpoint}`;
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

export { listTeams, addNewTeam, updateTeam, getSingleTeam, deleteTeam };
