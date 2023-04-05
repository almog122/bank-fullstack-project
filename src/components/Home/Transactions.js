import React, { useState } from 'react';
import { Users , Movies} from "../../Data";
import { Constants} from "../../Constants";
import User from './Transaction';
import './Home.css'

export default function Home({setUsername}){

  const [usersData, setUsersData] = useState({ users: Users});

  const loginUser = function(userID){
    let user = usersData.users.find( user => user.id === userID);
    setUsersData({...usersData})
    
    if(localStorage[user.name] === undefined){
      localStorage.setItem(user.name, JSON.stringify({
        movies : Movies ,
        budget : Constants.STARTING_BUDGET
      }))
    }

    setUsername(user.name)
  }

  return (
    <div className="home">
      {usersData.users.map(user=> <User user={user} loginUser={loginUser} key={user.id}/>)}
    </div>
  );
} 
