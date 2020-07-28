import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import HomePage from './pages/HomePage'
import { Route, Link } from "react-router-dom"
import UserProfilePage from './pages/UserProfilePage'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'


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
      <ToastContainer />
      <Navbar />
      <Route exact path="/" render={(props) => <HomePage {...props} users={users} isLoading={isLoading}/>}/>
      <Route path="/users/:id" render={(props) => <UserProfilePage {...props} users={users} />} />
    </div>
  );
}

export default App;
