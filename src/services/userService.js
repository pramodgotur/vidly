import http from "./httpService"
import config from "./config.json"

const apiUrl = config.apiEndpoint + "users/"

export function register(user) {
    return http.post(apiUrl, {
        email: user.username,
        password: user.password,
        name: user.name
    })
}