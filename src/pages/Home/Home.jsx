import React, { useEffect, useState } from 'react'
import { getWatchedMovies } from '../../services/movieQueries'
import MovieCard from '../../components/Movie/MovieCard'
import './Home.css'

const Home = () => {

    let [watchedMovies, setWatchedMovies] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await getWatchedMovies();
                setWatchedMovies(movies);
                //console.log(movies)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

  return (
    <div className="app-layout">
      <header className="app-header">pelisApp Header</header>
      <main className="app-main">pelisApp Main
        <div className='container movies'>
            {watchedMovies.length === 0 ? (
                'No results found' 
            ) : (
                watchedMovies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
                )) 
            )}
        </div>
      </main>
      <footer className="app-footer">pelisApp Footer</footer>
    </div>
  )
}

export default Home