import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <div className='movie-card'>
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`  : '/no-movie.png'}/>
    </div>
  )
}

export default MovieCard