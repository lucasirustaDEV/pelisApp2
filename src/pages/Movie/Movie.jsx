import React, { useEffect, useState } from 'react'
import { getWatchedMovie } from '../../services/movieQueries';
import { useParams } from 'react-router-dom';
import MovieCardSelect from '../../components/Movie/MovieCardSelect';
import { getMovieDetailTmdb } from '../../services/movieQueries';
import MovieCard from '../../components/Movie/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getWatchedMovieAsync, updateWatchedMovieAsync } from '../../redux/actions/moviesActions';


const Movie = () => {

  const params = useParams()
  const movieId = params.id

  const dispatch = useDispatch()
  const {watchedMovie, loading} = useSelector(store => store.moviesReducers)

  //let [watchedMovie, setWatchedMovie] = useState(null)
  let [watchedMovies, setWatchedMovies] = useState(null)
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  const [bodyData, setBodyData] = useState({
    tmdb_id: "",
  })

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId)
    setBodyData(movieId)
  }

/*   useEffect(() => {
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
  }, [movieId]); */ 

  useEffect(()=>{
    //if(Object.keys(watchedMovie).length === 0){}
      //console.log("no hay peli")
      dispatch(getWatchedMovieAsync(movieId))

  },[movieId])
  
  useEffect(() => {
    if (watchedMovie && watchedMovie.tmdb_ids && watchedMovie.tmdb_ids.length > 1) {
      console.log("CUMPLE LAS CONDICIONES")
      const fetchMovies = async () => {
        const moviesPromises = watchedMovie.tmdb_ids.map(async (tmdbId) => {
          //console.log("ESTOY DENTRO DEL MAP")
          try {
            return await getMovieDetailTmdb(tmdbId)
          } catch (error) {
            console.error('Error fetching movie:', error)
            return null;
          }
        });
        const movies = await Promise.all(moviesPromises)
        setWatchedMovies(movies)
        //console.log(watchedMovies)
      }
  
      fetchMovies()
    }
  }, [watchedMovie])
  
  const updateWatchedMovie = (e) => {
    e.preventDefault()
    const queryParams = { id: movieId, tmdb_id: selectedMovieId }
    //console.log(body)
    console.log(queryParams)
    dispatch(updateWatchedMovieAsync(queryParams))
      .then((res) => {
        console.log(res)
      })
  }
  
/*   const backgroundStyle = watchedMovie
    ? {
        backgroundImage: `url(${import.meta.env.VITE_URL_POSTER + watchedMovie.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '200px',
      }
    : {}; */

  return (
    <div className="app-layout">
      <header className="app-header">pelisApp Header</header>
      <main className="app-main">
        <div className="movie-details container align-items-center">
          {/* <div style={backgroundStyle} className="background-image"></div> */}
          <div className="movie-info row">
            {loading === true ? (
              'Loading...'
            ) : (
              watchedMovie && watchedMovie.poster_path ? (
              <>  
              <div className="col-md-2 mb-3">
                <img className="img-thumbnail img-fluid cursor" alt={watchedMovie.title} src={import.meta.env.VITE_URL_POSTER + watchedMovie.poster_path} />
              </div>
              <div className="col-md-2 mb-3">
                <h4 className="mt-2">{watchedMovie.title}</h4>
                {watchedMovie.release_date}
              </div>
              <div className="col-md-2 mb-3">
                <p className="btn btn-lg btn-primary" onClick={updateWatchedMovie}>Guardar</p>
              </div>
              </>
            ) : (
              <p>Información no disponible</p>
            )
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