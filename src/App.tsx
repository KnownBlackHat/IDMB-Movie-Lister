import { useEffect, useState } from 'react'
import HeroCarousel from './components/HeroCarousel';
import Row from './components/Row';

interface Movie {
    id: number;
    type: string;
    primaryTitle: string;
    primaryImage: {
        url: string;
        width: number;
        height: number;
    };
    runtimeSeconds: number;
    genres: string[];
    rating: {
        aggregateRating: number;
        voteCount: number;
    };
    plot: string;
}

async function fetchMoviesByType(type: string, signal: AbortSignal): Promise<Movie[]> {
    const response = await fetch(`https://api.imdbapi.dev/titles?types=${type}`, { signal });
    const data = await response.json();
    return data.titles;
}

function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [shows, setShows] = useState<Movie[]>([]);
    const [shows1, setShows1] = useState<Movie[]>([]);
    const [shows2, setShows2] = useState<Movie[]>([]);
    const [shows3, setShows3] = useState<Movie[]>([]);
    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            const [data, data2, data3, data4, data5] = await Promise.all([
                fetchMoviesByType('MOVIE', controller.signal),
                fetchMoviesByType('TV_SERIES', controller.signal),
                fetchMoviesByType('TV_MINI_SERIES', controller.signal),
                fetchMoviesByType('TV_SPECIAL', controller.signal),
                fetchMoviesByType('TV_MOVIE', controller.signal)
            ]);

            setMovies(data);
            setShows(data2);
            setShows1(data3);
            setShows2(data4);
            setShows3(data5);
        }

        fetchMovies();
        return () => {
            controller.abort();
        };
    }, [])

    return <div>
        <HeroCarousel movies={movies} />
        <Row title="Tv Series" movies={shows} />
        <Row title="Tv Mini Series" movies={shows1} />
        <Row title="Tv Special" movies={shows2} />
        <Row title="Tv Movies" movies={shows3} />
        <Row title="Popular Movies" movies={movies} />
    </div>


}

export default App
