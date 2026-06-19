import React from 'react'
import starimg from '../assets/star.svg'
import engflag from '../assets/eng_flag.png'
import worldflag from '../assets/world_flag.png'
import noimg from '../assets/no-movie.png'
const MovieCard = ({movie}) => {
  return (
    <div className='movie-card'>
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`  : noimg}/>

        <div className='mt-6 '>
          <h3>{movie.title}</h3>
          
          <div className='content'>
            <div className='rating'> 
              <img src={starimg}/>
              <p> {movie.vote_average ? movie.vote_average.toFixed(1): 'N/A' }</p> 
            </div> 
              <p className='mx-1.5'>●</p>
              <img src = {movie.original_language == 'en' ? engflag : worldflag}></img>
              <p className='mx-1.5'>●</p>
              <div className='text-gray-500'>{movie.release_date}</div>
          </div>
        </div>
    </div>
  )
}

export default MovieCard