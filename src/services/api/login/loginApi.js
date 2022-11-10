import { postApi } from "../../genericServices";
import APIROUTES from "../apiRoutes";

export async function signinApi(obj) {
  return await postApi(APIROUTES.SIGNIN, obj);
}
