export function getAccessToken() {
    if(localStorage.getItem("auth") !== undefined) {
        let token = localStorage.getItem("auth")
        if(token !== null) {
            return token;
        }
    }
    return undefined;
}

export function getRefreshToken() {
    if(localStorage.getItem("refresh") !== undefined) {
        let token = localStorage.getItem("refresh")
        if(token !== null) {
            return token;
        }
    }
    return undefined;
}