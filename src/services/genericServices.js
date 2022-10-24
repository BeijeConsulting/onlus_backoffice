import axios from "axios";
import CONFIG from "./genericConfig";

const axiosInstance = axios.create({
  baseURL: CONFIG.BASEURL,
  timeout: CONFIG.TIMEOUT,
});

export async function responseApi(response) {
  return {
    data: response?.data?.docs,
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
