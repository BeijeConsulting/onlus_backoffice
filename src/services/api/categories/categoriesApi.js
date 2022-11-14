import { putApi, postApi, deleteApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getApiCategories() {
  return await getApiNoAuth(APIROUTES.CATEGORY);
}

//get by ID
export async function getApiCategoryById(id) {
  return await getApiNoAuth(`${APIROUTES.CATEGORY}/${id}`);
}

//put by ID
export async function putApiCategoryById(id, obj) {
  return await putApi(`${APIROUTES.CATEGORY}/${id}`, obj);
}

//post
export async function postApiCategory(obj) {
  return await postApi(`${APIROUTES.CATEGORYADD}`, obj);
}

//delete by ID
export async function deleteApiCategoryById(id) {
  return await deleteApi(`${APIROUTES.CATEGORY}/${id}`);
}
