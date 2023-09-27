import axios from "axios";

const URL_MOVIES = import.meta.env.VITE_URL_MOVIES
const URL_TMDB = 'https://api.themoviedb.org/3/movie/'
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

export const getWatchedMovies = async (queryParams = '') => {
    try {
        const response = await axios(URL_MOVIES + 'watchedids' + queryParams)
        return response.data.response
    } catch (err) {
        return []
    }
}

export const getWatchedMovie = async (queryParams = '') => {
    try {
        const response = await axios(URL_MOVIES + queryParams)
        return response.data.response
    } catch (err) {
        return []
    }
}

export const getMovieDetailTmdb = async (queryParams = '') => {
    try {
        //console.log(queryParams)
        //console.log("LINEA: " + URL_TMDB + queryParams + '?api_key=' + TMDB_KEY)
        const response = await axios(URL_TMDB + queryParams + '?api_key=' + TMDB_KEY)
        //console.log(response)
        return response.data
    } catch (err) {
        return []
    }
}