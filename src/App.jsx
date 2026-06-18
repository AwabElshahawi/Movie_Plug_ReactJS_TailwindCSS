import { useState } from "react";
import { useEffect } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import heroimg from "./assets/hero.png";

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
  
  const fetchMovies = async () => {
    setisLoading(true);
    setError('');
    try {
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response = await fetch(endpoint, API_OPTIONS);
        
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
          setmovieList([]);
          return;
        }
        
        setmovieList(data.results || []);
        
    }
    catch (error) {
      setError('Error fetching movies');
      console.error('Error fetching movies:', error);
    }
    finally{
      setisLoading(false);
    }
  }
  useEffect( () => {
    fetchMovies();
  },[]);

  return ( 
    <main>
      <div className="warpper">
        <header>
          <img src={heroimg} alt="Hero Banner"/> 
          <h1> Find <span className="text-gradient"> Movies </span> You Like!</h1>
        </header>
        <Search searchterm={searchterm} setSearchterm={setSearchterm}/>
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