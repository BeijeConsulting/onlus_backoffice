import { putApi, postApi, deleteApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getApiArticles() {
  return await getApiNoAuth(APIROUTES.ARTICLE);
}

//get by ID
export async function getApiArticleById(id) {
  return await getApiNoAuth(`${APIROUTES.ARTICLE}${id}`);
}

//put by ID
export async function putApiArticleById(id, obj) {
  return await putApi(`${APIROUTES.ARTICLE}${id}`, obj);
}

//post
export async function postApiArticle(obj) {
  return await postApi(`${APIROUTES.ARTICLEADD}`, obj);
}

//delete by ID
export async function deleteApiArticleById(id) {
  return await deleteApi(`${APIROUTES.ARTICLE}${id}`);
}
