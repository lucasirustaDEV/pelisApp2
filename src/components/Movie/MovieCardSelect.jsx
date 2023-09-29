import React, { useEffect, useState } from 'react';
import './MovieCardSelect.css'

const MovieCardSelect = ( { movie, isSelected, onSelect } ) => {

    const toggleSelection = () => {
      onSelect(movie.id)
      console.log(movie.id)
    }
  
    return (
      <div className={`col-md-2 mb-3 ${isSelected ? 'selected' : ''}`}>

          <img
            className="img-thumbnail img-fluid cursor"
            alt={movie.title}
            src={movie.poster_path
                ? import.meta.env.VITE_URL_POSTER + movie.poster_path
                : '/movie-poster.jpg' 
              }
            onClick={toggleSelection}
          />

        <div>
          <h4 className="mt-2">{movie.title}</h4>
          {movie.release_date}
        </div>
      </div>
    );
  };

export default MovieCardSelect