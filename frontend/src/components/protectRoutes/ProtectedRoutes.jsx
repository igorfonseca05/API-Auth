import { useState, useEffect } from 'react'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import verifyToken from '../../hooks/useVerifyToken'

function ProtectedRoute() {

    // console.log(isValid)

    const isValid = localStorage.getItem('userAuth')

    return (
        isValid ? <Outlet /> : <Navigate></Navigate>
    )

}

export default ProtectedRoute