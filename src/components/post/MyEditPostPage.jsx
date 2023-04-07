import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MyBodyEditPost from './MyBodyEditPost'




function MyEditPostPage() {

  const navigate = useNavigate()
  const checkIsLogin = async () => {
    if (localStorage['access_token'] !== undefined) {
      // navigate('/edit/post/')
    } else {
      navigate('/login')
    }
  }
  useEffect(
    () => {
      checkIsLogin()
    }, []
  )

  return (
    <>
      <MyBodyEditPost />
    </>
  )
}

export default MyEditPostPage