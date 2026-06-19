  import { useState } from "react";
  import { useEffect } from "react";
  import { useDebounce } from "react-use";
  import { getTrending, updateSearchcount } from "../appwrite";
  import Search from "./components/Search";
  import Spinner from "./components/Spinner";
  import MovieCard from "./components/MovieCard";
  import heroimg from "./assets/hero.png";
  import noimg from './assets/no-movie.png'

  const API_BASE_URL = 'https://api.themoviedb.org/3';

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const  App = () => {
    const [searchterm, setSearchterm] = useState('');
    const [error, setError] = useState('');
    const [movieList, setmovieList] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [debouncedItem, setdebouncedItem] = useState('');
    const [trendingMovies, settrendingMovies] = useState('')
    
    useDebounce(() => setdebouncedItem(searchterm), 500, [searchterm])

    const fetchMovies = async (query = '') => {
      setisLoading(true);
      setError('');
      try {
          const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

          const response = await fetch(endpoint, API_OPTIONS);
          
          const data = await response.json();
          console.log(data);

          if (!response.ok) {
            throw new Error('Failed to fetch movies');
            setmovieList([]);
            return;
          }
          
          setmovieList(data.results || []);
          if (query && data.results.length > 0) {
            await updateSearchcount(query,data.results[0]);
          }
          
      }
      catch (error) {
        setError('Error fetching movies');
        console.error('Error fetching movies:', error);
      }
      finally{
        setisLoading(false);
      }
    }
    
    const loadTrending = async () => {
      try{
        const movies = await getTrending();
        settrendingMovies(movies);
      }
      catch(error){
        console.error(error);
      }
    }
    useEffect( () => {
      fetchMovies(debouncedItem);
    },[debouncedItem]);

    useEffect(() => {
      loadTrending(),[]
    })

    return ( 
      <main>
        <div className="warpper">
          <header>
            <img src={heroimg} alt="Hero Banner"/> 
            <h1> Find <span className="text-gradient"> Movies </span> You Like!</h1>
          </header>
          <Search searchterm={searchterm} setSearchterm={setSearchterm}/>
          
          {trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Most Searched</h2>
              <ul>
                {trendingMovies.map((movie,index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.posterURL ? movie.posterURL : noimg} alt={movie.title} />
                </li>
                ))}
              </ul>
            </section>
          )}

          <section className="movie-list">
            <h2 className="">Trending <span className="text-gradient">Movies</span></h2>
            {isLoading ? 
            ( 
              <Spinner/> ) : error ? <p className="error"> {error}</p> : 
              ( 
                <ul> {movieList.map( (movie) => ( <MovieCard key = {movie.id} movie={movie}/>) )}</ul>

              )
            }

          </section>

        </div>
      </main>
    );
  }
  
  export default App;