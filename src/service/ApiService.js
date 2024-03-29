import * as storage from "./StorageService";
import {Router} from "@vaadin/router";
import {BASE} from "../app"
import { jwtDecode } from "jwt-decode";

// deployed urls
// const api_url = "";
// const refresh_url = "";
// const login_url = "";

// local urls
const api_url = "http://localhost:8080/api";
const refresh_url = "http://localhost:8080/authenticate/refreshtoken";
const login_url = "http://localhost:8080/login";
const register_url = "http://localhost:8080/register"



export function checkAuth() {
    const token = storage.getRefreshToken();
    if(token === undefined || token === null) {
        return false;
    } 
    let decodedJwtToken = jwtDecode(token);
    return (
        new Date(decodedJwtToken.exp * 1000) > new Date() &&
        decodedJwtToken.iss === "nl-kpn-backend"
    )
}

function getNewAccessToken() {
    var fetchOptions = {
        method: "GET",
        headers: {
            "Authorization": storage.getAccessToken(),
            "refresh_token": storage.getRefreshToken()
        },
    };

   return fetch(refresh_url, fetchOptions)
        .then(response => {
            if(response.ok) {
                const authHeader = response.headers.get("Authorization");
                const token = authHeader.substring(7);
                localStorage.setItem("auth", token);
                return response;
            }
            Router.go(`${BASE}/logout`)
            throw new Error("Invalid Token")
        })
    }

function originalRequest(url, config) {
    config.headers.Authorization = "Bearer " + storage.getAccessToken()
    return fetch(api_url + url, config)
        .then(response => {
            return {response};
        });
}

function checkUnAuth(url, fetchOptions) {
    return getNewAccessToken()
        .then(response => {
            if(response.ok) {
                return originalRequest(url, fetchOptions)
                    .then(res => {
                        return res.response
                    });
            }
        }).catch(error => {
            return error
        })
}


export function login(formData) {

    var fetchOptions = {
        method: "POST",
        body: JSON.stringify(formData),
    }
    return fetch(login_url, fetchOptions)
        .then(response => {
            if(response.ok) {
              const authHeader = response.headers.get("Authorization");
              const token = authHeader.substring(7);
              const refreshHeader = response.headers.get("refresh_token");
              const refreshToken = refreshHeader.substring(13);
              window.localStorage.setItem("auth", token);
              window.localStorage.setItem("refresh", refreshToken)
            }
            else {
              throw new Error("Incorrect email or password")
            }
        })
}

export function register(formData) {
    var fetchOptions = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    return fetch(register_url, fetchOptions)
        .then(response => {
            if(response.ok) {
                return response;
            }
            else {
              throw new Error("Something did go wrong")
            }
        })
}

function getRequest(url) {
    var fetchOptions = {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + storage.getAccessToken(),
        },
    };
    return fetch(api_url + url, fetchOptions)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            if(response.status === 401) {
                return checkUnAuth(url, fetchOptions)
                    .then(res => {
                        return res.json();
                    }).catch(error => {
                        throw error;
                    });
            } else {
                response.json().then(e => {
                    throw new Error(e.error)
                })
            }
        })
}

function postRequest(url, data) {
    var fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + storage.getAccessToken(),
        },
        body: JSON.stringify(data),
    };
    return fetch(api_url + url, fetchOptions)
        .then(response => {
            console.log(response)
            if(response.ok) {
                return response;
            }
            if(response.status === 401) {
                return checkUnAuth(url, fetchOptions)
                    .then(res => {
                        return res;
                    }).catch(error => {
                        throw error;
                    });
            }
            throw new Error("error!");
        })
}

function patchRequest(url, data) {
    var fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + storage.getAccessToken(),
        },
        body: JSON.stringify(data),
    };
    return fetch(api_url + url, fetchOptions)
        .then(response => {
            if(response.ok) {
                return response;
            }
            if(response.status === 401) {
                return checkUnAuth(url, fetchOptions)
                    .then(res => {
                        return res;
                    }).catch(error => {
                        throw error;
                    });
            }
            throw new Error("error!");
        })
}

function deleteRequest(url) {
    var fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + storage.getAccessToken(),
        },
        body: JSON.stringify(data),
    };
    return fetch(api_url + url, fetchOptions)
        .then(response => {
            if(response.ok) {
                return response;
            }
            if(response.status === 401) {
                return checkUnAuth(url, fetchOptions)
                    .then(res => {
                        return res;
                    }).catch(error => {
                        throw error;
                    });
            }
            throw new Error("error!");
        })
}
export function setPersonalInfo(data) {
    return postRequest("/userinfo", data)
}