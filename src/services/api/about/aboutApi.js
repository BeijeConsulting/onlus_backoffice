import { putApi, getApiNoAuth, postApi } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getApiAbout() {
  return await getApiNoAuth(APIROUTES.ABOUT);
}

//put
export async function putApiAbout(obj) {
  return await putApi(`${APIROUTES.ABOUTUPDATE}`, obj);
}

//post
//put
export async function postApiAbout(obj) {
  return await postApi(`${APIROUTES.ABOUTADD}`, obj);
}