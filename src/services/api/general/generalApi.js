import {getApi,putApi} from "../../genericServices";
import APIROUTES from "../apiRoutes";


export async function getApiGeneral(){
    return await getApi(APIROUTES.GENERAL)
}

export async function putApiGeneral(obj){
    return await putApi(`${APIROUTES.GENERAL}/?id=1`,obj)
}
 