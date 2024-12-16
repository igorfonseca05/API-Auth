import { useState, useEffect } from 'react'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import verifyToken from '../../hooks/useVerifyToken'

import { fetchWithAuth } from '../../hooks/useAccessToken'

async function ProtectedRoute() {


    const isValid = localStorage.getItem('userAuth')

    return (
        isValid ? <Outlet /> : <Navigate></Navigate>
    )

}

export default ProtectedRoute