import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'

export default function User({user , loginUser}) {
  return (
    <Link to={`/catalog/${user.name}`}>
        <div className='user' onClick={() => loginUser(user.id)}>
            <img src={user.imageUrl} alt={""} className='profilePic'></img>
            <div className='name'>{user.name}</div>
        </div>
    </Link>
  )
}
