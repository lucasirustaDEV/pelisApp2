import { createReducer } from "@reduxjs/toolkit";
import { getWatchedMoviesAsync, setPage, getWatchedMovieAsync, updateWatchedMovieAsync } from "../actions/moviesActions";

const initialState = {
    watchedMovies: [],
    watchedMovie: {},
    loading: false,
    page: 1,
    totalPages: 0
}

const moviesReducers = createReducer( initialState,
    (builder) => builder
        .addCase(getWatchedMoviesAsync.fulfilled, (state, action) =>{
            console.log(action.payload)
            const newState = { 
                ...state, 
                watchedMovies : action.payload.response, 
                totalPages: action.payload.totalPages, 
                loading: false
            }
            return newState
        })
        .addCase(getWatchedMoviesAsync.pending, (state, action) =>{
            const newState = { ...state, loading: true}
            return newState
        })
        .addCase(getWatchedMoviesAsync.rejected, (state, action) =>{
            const newState = { ...state, loading: false}
            return newState
        })

        .addCase(getWatchedMovieAsync.fulfilled, (state, action) =>{
            console.log(action.payload)
            const newState = { 
                ...state, 
                watchedMovie : action.payload,
                loading: false
            }
            return newState
        })
        .addCase(getWatchedMovieAsync.pending, (state, action) =>{
            const newState = { ...state, loading: true}
            return newState
        })
        .addCase(getWatchedMovieAsync.rejected, (state, action) =>{
            const newState = { ...state, loading: false}
            return newState
        })

        .addCase(updateWatchedMovieAsync.fulfilled, (state, action) =>{
            console.log(action.payload)
            const newState = { 
                ...state, 
                watchedMovie : action.payload,
                loading: false
            }
            return newState
        })
        .addCase(updateWatchedMovieAsync.pending, (state, action) =>{
            const newState = { ...state, loading: true}
            return newState
        })
        .addCase(updateWatchedMovieAsync.rejected, (state, action) =>{
            const newState = { ...state, loading: false}
            return newState
        })

        .addCase(setPage, (state, action) => {
            const newState = { ...state, page : action.payload}
            return newState
        })
)

export default moviesReducers