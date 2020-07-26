import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import HomePage from './HomePage'

function App() {

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  axios.get('https://insta.nextacademy.com/api/v1/users')
  .then(result => {
    // console.log(result)
    setUsers(result.data)
    setIsLoading(false)
    
  })
  .catch(error => {
    console.log(error)
  })
}, [])

  return (
    <div>
      <HomePage users={users} isLoading={isLoading} />
    </div>
  );
}

export default App;
