import { getApi, putApi, postApi, deleteApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get by ID
export async function getPersonalArea(id) {
    return await getApi(`${APIROUTES.USER}/${id}`);
}

//put by ID
export async function putPersonalAreaById(id, obj) {
    return await putApi(`${APIROUTES.USER}/${id}`, obj);
}