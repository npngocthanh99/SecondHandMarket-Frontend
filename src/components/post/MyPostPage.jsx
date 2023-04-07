import React, { useEffect, useLayoutEffect, useState } from 'react'
import MyBodyPost from './MyBodyPost'
import MyHeader from '../common/MyHeader'
import { useNavigate } from 'react-router-dom';





function MyPostPage() {
    const navigate = useNavigate()
    const checkIsLogin = async () => {
        if (localStorage['access_token'] !== undefined) {
            navigate('/post')
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
            <MyBodyPost />
        </>

    )

}

export default MyPostPage