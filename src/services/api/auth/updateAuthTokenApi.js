import { postApiNoAuth } from "../../genericServices";

export async function updateAuthTokenApi() {
  return await postApiNoAuth("updateAuthToken", {
    refreshToken: localStorage.getItem("onlusRefreshToken"),
  });
}
