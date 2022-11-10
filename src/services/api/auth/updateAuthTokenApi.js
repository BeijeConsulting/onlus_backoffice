import { postApi } from "../../genericServices"

export async function updateAuthTokenApi(){
    return await postApi('updateAuthToken', {
        "refreshToken": localStorage.getItem('onlusRefreshToken')
    })
}