import { putApi, postApi, deleteApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getFaq() {
    return await getApiNoAuth(APIROUTES.FAQ);
}

//put info
export async function putFaqInfo(id, obj) {
    return await putApi(`${APIROUTES.INFOPUT}/${id}`, obj);
}

//post qna
export async function postQna(obj) {
    return await postApi(APIROUTES.FAQHANDLE, obj)
}

//put qna
export async function putQnaBydId(id, obj) {
    return await putApi(`${APIROUTES.FAQHANDLE}/${id}`, obj)
}

//delete qna
export async function deleteQnaById(id) {
    return await deleteApi(`${APIROUTES.FAQHANDLE}/${id}`);
}