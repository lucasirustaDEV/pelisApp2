import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/Movie/MovieCard'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getWatchedMoviesAsync, setPage } from '../../redux/actions/moviesActions'

const Home = () => {

  const dispatch = useDispatch()
  const {watchedMovies, loading, page, totalPages} = useSelector(store => store.moviesReducers)

  useEffect(()=>{
    if(watchedMovies.length === 0){
      dispatch(getWatchedMoviesAsync())
    }
  },[])

  const handlePageChange = (newPage) => {
    if(newPage > 1 && newPage < totalPages) {
      dispatch(getWatchedMoviesAsync('?page=' + newPage))
      dispatch(setPage(newPage))
    }
  }

  return (
    <div className="app-layout">
      <header className="app-header">pelisApp Header</header>
      <main className="app-main">pelisApp Main
        <div className='container movies'>
        {loading === true ? (
            'Loading...'
            ) : watchedMovies.length === 0 ? (
              'No results found'
            ) : (
              watchedMovies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
                )) 
          )}
        </div>
        <div className="col-6 text-end pe-3 gap-3">
          <a className={`btn btn-primary mb-3 mr-1 ${page === 1 ? 'disabled' : ''}`} role="button" data-slide="prev" onClick={() => handlePageChange(page - 1)}>
              <i className="fa fa-arrow-left"></i>
          </a>
          <a className={`btn btn-primary mb-3 mr-1 ${page === totalPages ? 'disabled' : ''}`} role="button" data-slide="next" onClick={() => handlePageChange(page + 1)}>
              <i className="fa fa-arrow-right"></i>
          </a>
          </div>
      </main>
      <footer className="app-footer">pelisApp Footer</footer>
    </div>
  )
}

export default Home