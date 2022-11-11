import axios from "axios";
import CONFIG from "./genericConfig";
import { updateAuthTokenApi } from "./api/auth/updateAuthTokenApi";

const axiosInstance = axios.create({
  baseURL: CONFIG.BASEURL,
  timeout: CONFIG.TIMEOUT,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("onlusToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.request.use(
  async config => {
    const value = await redisClient.get(rediskey)
    const keys = JSON.parse(value)
    config.headers = { 
      'Authorization': `Bearer ${keys.access_token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    originalRequest._retry = false;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (localStorage.getItem("onlusRefreshToken") !== null) {
        let updateToken = await updateAuthTokenApi();
        console.log(updateToken);
        if (updateToken.status === 200) {
          const { token, refreshToken } = updateToken.data;
          console.log("updateToken", updateToken);
          localStorage.setItem("onlusToken", token);
          localStorage.setItem("onlusRefreshToken", refreshToken);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          return axiosInstance(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

export async function responseApi(response) {
  return {
    data: response?.data,
    status: response?.status,
  };
}
export async function responseError(error) {
  return {
    message: error?.message,
    status: error?.status,
  };
}

export async function getApi(resource, header = null) {
  return axiosInstance
    .get(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}

export async function postApi(resource, obj, header = null) {
  return axiosInstance
    .post(resource, obj, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}

export async function putApi(resource, obj, header = null) {
  return axiosInstance
    .put(resource, obj, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}

export async function deleteApi(resource, header = null) {
  return axiosInstance
    .delete(resource, {
      headers: header !== null ? { Authorization: `Bearer ${header}` } : "",
    })
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}
