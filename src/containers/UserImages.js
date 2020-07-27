import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image, {onLoadCallback, onErrorCallback} from 'react-graceful-image'
import Loader from '../components/Loader'

function UserImages(props) {

    const [userImages, setUserImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${props.id}`)
        .then(result => {
          // console.log(result)
          setIsLoading(false)
          console.log(result.data)
          setUserImages(result.data)
          
        })
        .catch(error => {
          console.log(error)
        })
      }, [])
    return (
        <div>
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

export default UserImages;