import { getApiNoAuth, postApi } from "../../genericServices";
import APIROUTES from "../apiRoutes";

export async function getApiHome() {
  return await getApiNoAuth(APIROUTES.HOME);
}

export async function postApiHome(obj) {
  return await postApi(APIROUTES.HOMEEDIT, obj);
}
