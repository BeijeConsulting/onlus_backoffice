import { putApi,getApi,postApi, deleteApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all social list
export async function getAllSocialApi(){
    return await getApiNoAuth(APIROUTES.SOCIAL);
}

//get single social by id
export async function getSocialById(id){
    return await getApi(`${APIROUTES.SOCIALSINGLE}/${id}`)
}

//delete single social by id
export async function deleteSocialById(id){
    return await deleteApi(`${APIROUTES.SOCIALDELETE}/${id}`);
}

//create a new social
export async function createNewSocialApi(body){
    return await postApi(APIROUTES.SOCIALADD,body)
}

//update a social by id
export async function updateSocialById(id,body){
    return await putApi(`${APIROUTES.SOCIALUPDATE}/${id}`,body)
}