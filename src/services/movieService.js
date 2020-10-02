import http from "./httpService"
import config from "./config.json"

const apiUrl = config.apiEndpoint + "movies/"

function movieUrl(id) {
    return `${apiUrl}/${id}`
}

export function getMovies() {
    return http.get(apiUrl)
}

export function getMovie(movieId) {
    return http.get(movieUrl(movieId))
}

export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId))
}

export function saveMovie(movie) {
    const movieId = movie._id
    const body = { ...movie }
    delete body._id
    if (movieId !== undefined && movieId.trim() !== "") {
        return http.put(movieUrl(movieId), body)
    }
    return http.post(apiUrl, body)
}