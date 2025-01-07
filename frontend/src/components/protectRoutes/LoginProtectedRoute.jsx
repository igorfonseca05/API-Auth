import React from 'react'

import { useAuthContext } from '../../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function LoginProtectedRoute({ userAuth }) {

    console.log(userAuth)

    return (
        !userAuth ? <Outlet /> : <Navigate to={"/"} />
    )
}

export default LoginProtectedRoute