import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    async function fetchMoviesHandler() {
      setIsLoading(true);
     const response = await fetch('https://swapi.dev/api/films/');
     const data = await response.json();
     
     const transformedMovies = data.results.map(data => {
          return {
            id: data.episode_id,
            title: data.title,
            openingText: data.opening_crawl,
            releaseDate: data.release_date
          }
        });
        setMovies(transformedMovies);
        setIsLoading(false);
      };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <h1>No movies found</h1>}
        {isLoading && <h1>Loading...</h1>}
      </section>
    </React.Fragment>
  );
}

export default App;
