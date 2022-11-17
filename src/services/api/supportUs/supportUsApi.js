import { putApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getApiSupport() {
  return await getApiNoAuth(APIROUTES.SUPPORTUS);
}

//put
export async function putApiSupport(obj) {
  return await putApi(`${APIROUTES.SUPPORTUSUPDATE}`, obj);
}
