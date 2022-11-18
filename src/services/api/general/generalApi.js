import { getApi, putApi,getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

export async function getApiGeneral() {
  return await getApi(APIROUTES.GENERAL);
}

export async function putApiGeneral(id, obj) {
  return await putApi(`${APIROUTES.GENERALPUT}/${id}`, obj);
}

export async function getApiNoAuthGeneral() {
  return await getApiNoAuth(APIROUTES.GENERAL);
}