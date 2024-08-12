import { Link } from "react-router-dom";
import React from "react"; // Certifique-se de importar React

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
