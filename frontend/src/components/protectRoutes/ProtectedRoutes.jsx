import { useState, useEffect } from 'react'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import verifyToken from '../../hooks/useVerifyToken'

import { fetchWithAuth } from '../../hooks/useAccessToken'

function ProtectedRoute() {

    const { user } = localStorage.length ? JSON.parse(localStorage.getItem('userAuth')) : ''

    // console.log(user.access_token)

    return (
        user?.access_token ? <Outlet /> : <Navigate to={"/login"} />
    )

}

export default ProtectedRoute