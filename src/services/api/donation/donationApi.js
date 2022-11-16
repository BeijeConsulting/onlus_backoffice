import { postApi, getApi } from "../../genericServices";
import APIROUTES from "../apiRoutes";

//get all
export async function getApiDonation() {
  return await getApi(APIROUTES.DONATION);
}

//get by ID
export async function getApiDonationAmount(id) {
  return await getApi(`${APIROUTES.DONATIONAMOUNT}`);
}

//post
export async function postApiDonation(obj) {
  return await postApi(`${APIROUTES.DONATION}/new`, obj);
}
