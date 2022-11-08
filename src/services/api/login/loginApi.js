import { getApi } from "../../genericServices";
import APIROUTES from "../apiRoutes";

export async function getApiLogin() {
  return await getApi(`${APIROUTES.USERACCOUNTS}/1`);
}
