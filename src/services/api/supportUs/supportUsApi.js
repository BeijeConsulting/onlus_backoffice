import { postApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getApiSupport() {
  return await getApiNoAuth(APIROUTES.SUPPORTUS);
}

//put
export async function postApiSupport(obj) {
  return await postApi(`${APIROUTES.SUPPORTUSUPDATE}`, obj);
}

//post
export async function postApiSupport(obj) {
  return await putApi(`${APIROUTES.SUPPORTADD}`, obj);
}
