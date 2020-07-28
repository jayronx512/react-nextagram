import React from 'react'
import { Link } from "react-router-dom"
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

function Navbar() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/users/1">My Profile</Link>
            <SignUp />
            <Login />
        </div>
    )
}

export default Navbar

