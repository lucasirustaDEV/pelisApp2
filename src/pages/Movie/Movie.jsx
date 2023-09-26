import React from 'react'

const Movie = () => {
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

export default Movie