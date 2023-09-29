import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_MOVIES = import.meta.env.VITE_URL_MOVIES
const URL_TMDB = 'https://api.themoviedb.org/3/movie/'
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

const setPage = createAction('setPage', ( page ) => {
    return {
        payload: page
    }
})

const getWatchedMoviesAsync = createAsyncThunk('getWatchedMoviesAsync', async ( queryParams = '' ) => {
    try {
        const response = await axios.get(URL_MOVIES + 'watchedids' + queryParams)
        return response.data        
    } catch (err) {
        console.log(err)        
        return []
    }
})

const getWatchedMovieAsync = createAsyncThunk('getWatchedMovieAsync', async (queryParams = '') => {
    try {
        const response = await axios.get(URL_MOVIES + queryParams)
        return response.data.response
    } catch (err) {
        console.log(err)        
        return []
    }
})

const updateWatchedMovieAsync = createAsyncThunk('updateWatchedMovieAsync', async ( queryParams = '' ) => {
    try {
        //console.log(params)
        //const { id, tmdb_id } = params
        //console.log(queryParams)
        const response = await axios.post(URL_MOVIES + '/update', queryParams)
        return response.data.response
    } catch (err) {
        console.log(err)        
        return []
    }
})


export { getWatchedMoviesAsync, setPage, getWatchedMovieAsync, updateWatchedMovieAsync}