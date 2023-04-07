import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MyBodyEditProfile from './MyBodyEditProfile'

function MyEditProfilePage() {

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

    <div>
      <MyBodyEditProfile />
    </div>
  )
}

export default MyEditProfilePage