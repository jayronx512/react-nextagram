import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
            {isLoading ? <div class="loadingio-spinner-spin-t2vmr6gsep"><div class="ldio-jgh4cv9kzy">
                <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
                </div></div> : null}
            {userImages.map(userImage => (
                <img style={{width:"20px"}} src={userImage} />
            ))}
        </div>
    )
}

export default UserImages;