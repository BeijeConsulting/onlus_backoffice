import { getApi, putApi, postApi, deleteApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get active
export async function getActiveCollaborators() {
    return await getApi(APIROUTES.ACTIVECOLLABORATORS);
}

//get deactivated
export async function getDeactivatedCollaborators() {
    return await getApi(APIROUTES.DEACTIVATEDCOLLABORATORS);
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

//activate by ID
export async function activateCollaboratorById(id) {
    return await putApi(`${APIROUTES.USER}/active/${id}`);
}

//get active guests
export async function getActiveGuests() {
    return await getApi(APIROUTES.ACTIVEGUESTS);
}

//get deactivated guests
export async function getDeactivatedGuests() {
    return await getApi(APIROUTES.DEACTIVATEDGUESTS);
}