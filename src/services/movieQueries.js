import axios from "axios";

const URL_MOVIES = import.meta.env.VITE_URL_MOVIES

export const getWatchedMovies = async (queryParams = '') => {
    try {
        const response = await axios(URL_MOVIES + queryParams)
        return response.data.response
    } catch (err) {
        return []
    }
}