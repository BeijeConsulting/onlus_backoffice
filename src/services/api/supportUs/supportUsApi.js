import { postApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getApiSupport() {
  return await getApiNoAuth(APIROUTES.SUPPORTUS);
}

//post
export async function postApiSupport(obj) {
  return await postApi(`support/save-support`, obj);
}
