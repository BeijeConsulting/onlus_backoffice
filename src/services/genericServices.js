import axios from "axios";
import CONFIG from "./genericConfig";
import { updateAuthTokenApi } from "./api/auth/updateAuthTokenApi";

//instanza axios per chiamate non autenticate
const axiosInstance = axios.create({
  baseURL: CONFIG.BASEURL,
  timeout: CONFIG.TIMEOUT,
});

//instanza axios per chiamate con richiesta di autenticazione
const axiosInstanceToken = axios.create({
  baseURL: CONFIG.BASEURL,
  timeout: CONFIG.TIMEOUT,
});

//intercetta le richieste con autenticazione, controlla nello storage se esiste il token e lo inserisce nell'header,
axiosInstanceToken.interceptors.request.use(
  (config) => {
    //si puo usare qualsisi storage
    const token = localStorage.getItem("onlusToken");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//intercetta la risposta
axiosInstanceToken.interceptors.response.use(
  //se positiva invia la risposta
  function (response) {
    return response;
  },
  //se con errore
  async function (error) {
    console.log("responseError", error);
    const originalRequest = error.config;
    //se l'errore è 401 usa il refresh Token per ricevere il nuovo token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const updateToken = await updateAuthTokenApi();
      console.log(updateToken);
      if (updateToken.status === 200) {
        const { token, refreshToken } = updateToken.data;
        localStorage.setItem("onlusToken", token);
        localStorage.setItem("onlusRefreshToken", refreshToken);
        //riprova a fare la chiamata avendo il token aggiornato nello storage
        return axiosInstanceToken(originalRequest);
      }
    }
    //qui gestire altri errori 403, 404, 500
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

export async function getApi(resource) {
  return axiosInstanceToken
    .get(resource)
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}

export async function getApiNoAuth(resource) {
  return axiosInstance
    .get(resource)
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}

export async function postApi(resource, obj) {
  return axiosInstanceToken
    .post(resource, obj)
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}

export async function postApiNoAuth(resource, obj) {
  return axiosInstance
    .post(resource, obj)
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}

export async function putApi(resource, obj) {
  return axiosInstanceToken
    .put(resource, obj)
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}

export async function deleteApi(resource) {
  return axiosInstanceToken
    .delete(resource)
    .then((response) => {
      return responseApi(response);
    })
    .catch((error) => {
      return responseError(error);
    });
}
