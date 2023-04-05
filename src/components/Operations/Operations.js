import React, { useState } from 'react'
import Movie from './Movie';
import { Constants } from "../../Constants";
import { useParams } from 'react-router-dom';
import './Catalog.css'

export default function Catalog () {

  const username = Object.keys(useParams())[0]
  const userData = JSON.parse(localStorage[username])

  const [userMovies, setUserMovies] = useState(userData.movies);
  const [searchBar, setSearchBar] = useState("");
  const [budget , setBudget] = useState(userData.budget)

  const rentMovie = function(movieID){
    const movieIndex = userMovies.findIndex(m => m.id === movieID)
    const isMovieRented = userMovies[movieIndex].isRented

    if(budget > 0 || isMovieRented){
      const rentedMovie = {...userMovies[movieIndex] , isRented : !isMovieRented}
      const newBudget = isMovieRented ? budget + Constants.MOVIE_PRICE : budget - Constants.MOVIE_PRICE
      
      userMovies.splice(movieIndex, 1 , rentedMovie)
      setUserMovies([...userMovies])
      setBudget(newBudget)

      localStorage.setItem(username, JSON.stringify({
        movies : userMovies ,
        budget : newBudget
      }))
    }else{
      alert('Insufficient budget')
    }
  }

  const UpdateSearchBar = function(event){
    setSearchBar(event.target.value)
  }

  const filterMovieTitle = function(title){
    return title.toLowerCase().includes(searchBar.toLowerCase())
  }

  return (
    <div className='catalog'>

      <h1 className='username'>Welcome {username}</h1>

      <input className="searchInput" placeholder='Search' onChange={UpdateSearchBar} value={searchBar} />

      <div className='budget'>Budget: {budget}</div>

      {userMovies.find(movie => movie.isRented === true) !== undefined ?
      <>
        <h1> Rented : </h1>
        <div className='movies-container'>
          {userMovies.map(movie => movie.isRented && filterMovieTitle(movie.title) ? <Movie movie={movie} rentMovie={rentMovie} key={movie.id} /> : <></>)} 
        </div>
      </>
      : <></>}

      <h1> Catalog :</h1>
      <div className='movies-container'>
        {userMovies.map(movie => !movie.isRented && filterMovieTitle(movie.title) ? <Movie movie={movie} rentMovie={rentMovie} key={movie.id} />  : <> </>)}
      </div>
    </div>
  )
}