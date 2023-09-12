import React from 'react'
import  './Post.css'
import { Avatar } from '@mui/material'

function Post({username, caption, imageUrl}) {
  return (
    <div className='post'>
    <div className='post__header'>
    <Avatar className='post__avatar'
            alt={username}
            src="https://abc" />

<h3>{username}</h3>

    </div>
    
   
    <img className='post__image'
          src={imageUrl}
          alt="" />

          <div className='post__caption'><strong>{username}</strong>{caption}</div>
          </div>
  )
}

export default Post