import { putApi, postApi, deleteApi, getApiNoAuth } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all events
export async function getAllEventsApi(){
    return await getApiNoAuth(APIROUTES.EVENTS);
}

//get a single event
export async function getEventByIdApi(id){
    return await getApiNoAuth(`${APIROUTES.EVENTSINGLE}/${id}`);
}

//delete an event
export async function deleteEventByIdApi(id){
    return await deleteApi(`${APIROUTES.EVENTSDELETE}/${id}`);
}

//update an event
export async function updateEventByIdApi(id,body){
    return await putApi(`${APIROUTES.EVENTSUPDATE}/${id}`,body);
}

//create a new event
export async function createEventApi(body){
    return await postApi(APIROUTES.EVENTSADD,body);
}

