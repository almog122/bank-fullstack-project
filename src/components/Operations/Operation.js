import React from 'react'
import { Link } from 'react-router-dom'
import './Movie.css'

export default function Movie({movie , rentMovie}) {
  return (

    <div className='movie'>
    <Link to={`/movies/${movie.id}`}> <img className='moviePic' src={movie.img} alt='' /> </Link>
      <button className='rentMovieBtn' onClick={() => rentMovie(movie.id)}> {movie.isRented ? '-' : '+'} </button>
    </div>

  )
}
