import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MyBodyManagePosting from './MyBodyManagePosting'

function MyManagePostingPage() {

  const navigate = useNavigate()
  const checkIsLogin = async () => {
    if (localStorage['access_token'] !== undefined) {
      navigate('/managePosting');
    } else {
      navigate('/login');
    }
  }
  useEffect(
    () => {
      checkIsLogin()
    }, []
  )

  return (
    <>
      <MyBodyManagePosting />
    </>
  )
}

export default MyManagePostingPage