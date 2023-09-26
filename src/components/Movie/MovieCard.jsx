import React from 'react'
import { Link as Anchor } from "react-router-dom"

const MovieCard = ( { movie } ) => {
  return (
    <div className="col-md-2 mb-3">
        <Anchor to={'/movie/' + movie.tmdb_id}>
            <img className="img-thumbnail img-fluid cursor" alt={movie.title} src={import.meta.env.VITE_URL_POSTER + movie.poster_path} />
        </Anchor>
        <div>
            <h4 className="mt-2">{movie.title}</h4>
            {movie.year}
        </div>
    </div>
  )
}

export default MovieCard