import React from 'react'
import './App.css';
import UserImages from './UserImages'

function HomePage(props) {
    return (
        <div>
            <h1>Home Page</h1>
                {props.isLoading ? <div class="loadingio-spinner-spin-t2vmr6gsep"><div class="ldio-jgh4cv9kzy">
                <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
                </div></div> : null}
                <ul>
                    {props.users.map(user => (
                    <li key={user.id}>
                        <img style={{
                        width: "10vw"
                        }} src={user.profileImage} />
                        {user.id}: {user.username}
                        <UserImages id={user.id}/>
                    </li>
                    ))}
                </ul>
      </div>
    )
}

export default HomePage