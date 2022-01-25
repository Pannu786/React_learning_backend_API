import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      
      if (!response.ok) {
        throw new Error("Something isn't right");
      }
      
      const data = await response.json();
      
      const trasnsformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(trasnsformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[])
  
  useEffect(() => {
    fetchMoviesHandler()
  },[fetchMoviesHandler]);
  let content = <p>Woops No Movies For You My Man!!</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (isLoading) {
    content = <p>Wait Fella We Are Loading....</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
