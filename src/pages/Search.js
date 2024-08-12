import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './FilmesGrid.css';

const searchURL = 'https://api.themoviedb.org/3/search/movie';
const apiKey = '24daef97b5d09da4b6bdceb2bb3af672';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [activeMovie, setActiveMovie] = useState(null);

    const query = searchParams.get('q') || '';

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = `${searchURL}?api_key=${apiKey}&language=pt-BR&query=${query}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        if (query) {
            fetchMovies();
        }
    }, [query]);

    const handleDetailsClick = (movie) => {
        if (activeMovie && activeMovie.id === movie.id) {
            setActiveMovie(null);
        } else {
            setActiveMovie(movie); 
        }
    };

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const formatRating = (rating) => {
        return rating.toFixed(1); 
    };

    return (
        <div className="movies-container">
            <h1 className="title">Resultados:</h1>
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
        </div>
    );
};

export default Search;
