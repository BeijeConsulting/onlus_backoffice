import { putApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getApiAbout() {
  return await getApiNoAuth(APIROUTES.ABOUT);
}

//put
export async function putApiAbout(obj) {
  return await putApi(`${APIROUTES.ABOUTUPDATE}`, obj);
}
