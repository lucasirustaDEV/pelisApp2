import React, { useEffect, useState } from 'react'
import { getWatchedMovie } from '../../services/movieQueries';
import { useParams } from 'react-router-dom';
import MovieCardSelect from '../../components/Movie/MovieCardSelect';
import { getMovieDetailTmdb } from '../../services/movieQueries';
import MovieCard from '../../components/Movie/MovieCard';


const Movie = () => {

  const params = useParams()
  const movieId = params.id

  let [watchedMovie, setWatchedMovie] = useState(null)
  let [watchedMovies, setWatchedMovies] = useState(null)
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movie = await getWatchedMovie(movieId)
        setWatchedMovie(movie);
        console.log(movie);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };
  
    fetchData();
  }, [movieId]); 
  
  useEffect(() => {
    if (watchedMovie && watchedMovie.tmdb_ids && watchedMovie.tmdb_ids.length > 1) {
      console.log("CUMPLE LAS CONDICIONES")
      const fetchMovies = async () => {
        const moviesPromises = watchedMovie.tmdb_ids.map(async (tmdbId) => {
          console.log("ESTOY DENTRO DEL MAP")
          try {
            return await getMovieDetailTmdb(tmdbId)
          } catch (error) {
            console.error('Error fetching movie:', error)
            return null;
          }
        });
        const movies = await Promise.all(moviesPromises)
        setWatchedMovies(movies)
        console.log(watchedMovies)
      }
  
      fetchMovies()
    }
  }, [watchedMovie])
  
  
  const backgroundStyle = watchedMovie
    ? {
        backgroundImage: `url(${import.meta.env.VITE_URL_POSTER + watchedMovie.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '200px',
      }
    : {};

  return (
    <div className="app-layout">
      <header className="app-header">pelisApp Header</header>
      <main className="app-main">
        <div className="movie-details">
          {/* <div style={backgroundStyle} className="background-image"></div> */}
          <div className="movie-info">
          {watchedMovie && (
           <>
            <div className="col-md-2 mb-3">
              <img className="img-thumbnail img-fluid cursor" alt={watchedMovie.title} src={import.meta.env.VITE_URL_POSTER + watchedMovie.poster_path} />
            </div>
            <div className="col-md-2 mb-3">
              <h4 className="mt-2">{watchedMovie.title}</h4>
              {watchedMovie.release_date}
            </div>
            </>
            )}
          </div>
        </div>
        <div className='container movie-tmdb-ids movies'>
        {watchedMovies && (
           <>
          {watchedMovies.length === 0 ? (
                'Loading...' 
            ) : (
              watchedMovies.map((movie) => (
                <MovieCardSelect
                key={movie.id}
                movie={movie}
                isSelected={selectedMovieId === movie.id}
                onSelect={handleMovieSelect}
              />
                )) 
            )}
            </>
            )}
        </div>
      </main>
      <footer className="app-footer">pelisApp Footer</footer>
    </div>
  )
}

export default Movie