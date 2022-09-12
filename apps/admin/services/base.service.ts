import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = "https://aanay.pythonanywhere.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response: unknown) => response,
  async (error: { config: any; response: any }) => {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      // errorDetail({ detail: "No internet connection" })
      return Promise.reject(error);
    }

    if (
      error.response.status === 400 &&
      originalRequest.url === `${BASE_URL}/api/v1/auth/access-token`
    ) {
      return Promise.reject(error);
    }

    if (
      error.response.data.status === "token_not_valid" &&
      error.response.status === 401
    ) {
      return axiosInstance
        .post(`${BASE_URL}/api/v1/auth/access-token`, {
          refreshToken: "getRefreshToken()",
        })
        .then((response: any) => {
          originalRequest.headers.Authorization = `Bearer ${response.data.accesstoken}`;
          window.location.reload();

          return axiosInstance(originalRequest);
        })
        .catch((err: any): any => {
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

interface apiPath {
  apiRoute: "auth" | "service";
}

interface dataProps {
  [key: string]: any;
}

const getData = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => axiosInstance.get(url, config);

const postData = async (
  url: string,
  data?: dataProps,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => axiosInstance.post(url, data, config);

const patchData = async (
  url: string,
  data?: dataProps,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => axiosInstance.patch(url, data, config);

const putData = async (
  url: string,
  data?: dataProps,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => axiosInstance.put(url, data, config);

const deleteData = async (
  url: string,
  data?: dataProps,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => axiosInstance.delete(url, config);

const getApiPath = ({ apiRoute }: apiPath): string =>
  `${BASE_URL}/api/v1/${apiRoute}`;

export default axiosInstance;

export { getData, getApiPath, postData, patchData, putData, deleteData };
