import { getApi, putApi, postApi, deleteApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getCollaborators() {
    return await getApi(APIROUTES.COLLABORATORS);
}

//post
export async function postCollaborator(obj) {
    return await postApi(`${APIROUTES.USERADD}`, obj);
}

//put by ID
export async function putApiCollaboratorById(id, obj) {
    return await putApi(`${APIROUTES.USER}/${id}`, obj);
}

//delete by ID
export async function deleteCollaboratorById(id) {
    return await deleteApi(`${APIROUTES.USER}/${id}`);
}