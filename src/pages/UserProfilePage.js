import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image, { onLoadCallback, onErrorCallback} from 'react-graceful-image'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'

function UserProfilePage(props) {
    let { id } = useParams();
    const [userImages, setUserImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
        .then(result => {
          // console.log(result)
          setUserImages(result.data)
          setIsLoading(false)
          
        })
        .catch(error => {
          console.log(error)
        })
      }, [])
    return (
        <div>
            <h1>User Profile Page</h1>
            {props.users.map(user => (
                user.id==id ? <h2>{user.username}</h2> : null
            ))}
            {/* <h2>{props.users[id].username}</h2> */}
            {isLoading ? <Loader width="100px" height="100px" color="black"/> : null}
            {userImages.map(userImage => (
                <Image
                    src={userImage}
                    width='250'
                    height='250'
                    style={{ padding: '20px' }}
                    alt='My awesome image'
                    retry={{ count: 10, delay: 2 }}
                    onLoad={ onLoadCallback }
                    onError={ onErrorCallback }
                />
            ))}
        </div>
    )
}

export default UserProfilePage