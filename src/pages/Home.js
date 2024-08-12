import React, { useState, useEffect } from 'react';
import '../pages/FilmesGrid.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);

  const apiKey = '24daef97b5d09da4b6bdceb2bb3af672';
  const moviesURL = 'https://api.themoviedb.org/3/movie';

  const fetchMovies = async () => {
    try {
      const url = `${moviesURL}/popular?api_key=${apiKey}&language=en-US&page=1`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(`Movies Error: ${error.message}`);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const topRateUrl = `${moviesURL}/top_rated?api_key=${apiKey}&language=en-US&page=1`;
      const response = await fetch(topRateUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTopMovies(data.results);
    } catch (error) {
      setError(`Top Rated Movies Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMovies();
        await fetchTopRatedMovies();
      } catch (error) {
        setError(`Fetch Data Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, moviesURL]);

  const handleDetailsClick = (movie) => {
    if (activeMovie && activeMovie.id === movie.id) {
      setActiveMovie(null); 
    } else {
      setActiveMovie(movie); 
    }
  };

  // Função para formatar a data de formato 
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  // Função para formatar a avaliação
  const formatRating = (rating) => {
    return rating.toFixed(1); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movies-container">
      <h1 className="title">Melhores Filmes</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <div>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
              />
              <h2>{movie.title}</h2>
              <button onClick={() => handleDetailsClick(movie)}>Mais detalhes</button>
              {activeMovie && activeMovie.id === movie.id && (
                <p className="description">{movie.overview}</p>
              )}
              <p><strong>Lançamento:</strong> {formatDate(movie.release_date)}</p>
              <p><strong>Avaliação:</strong> {formatRating(movie.vote_average)}</p>
            </div>
          </li>
        ))}
      </ul>

      <h1 className="title">Filmes mais bem avaliados</h1>
      <ul>
        {topMovies.map(movie => (
          <li key={movie.id}>
            <div>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
              />
              <h2>{movie.title}</h2>
              <button onClick={() => handleDetailsClick(movie)}>Mais detalhes</button>
              {activeMovie && activeMovie.id === movie.id && (
                <p className="description">{movie.overview}</p>
              )}
              <p><strong>Lançamento:</strong> {formatDate(movie.release_date)}</p>
              <p><strong>Avaliação:</strong> {formatRating(movie.vote_average)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
