import { useState, useEffect, createContext, useContext } from 'react'
import useAuth from '../hooks/useAuth'
// import { deleteMany } from '../../../backend/src/models/userModel'

export const UserAuthContext = createContext()

export function UserAuthContextProvider({ children }) {

    const [userAuth, setUserAuth] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [loading, setLoading] = useState(false)


    // Salvando dados usuário no localStorage
    useEffect(() => {
        if (userAuth && localStorage.length === 0) {
            localStorage.setItem('userAuth', JSON.stringify(userAuth))
            console.log('oi')
            return
        }

    }, [userAuth])

    // Obtendo dados do localStorage caso ele já exista
    useEffect(() => {
        if (localStorage.length) {
            const userSaved = JSON.parse(localStorage.getItem('userAuth'))
            console.log('ola')
            setUserAuth(userSaved)
        }
    }, [])

    return (
        <UserAuthContext.Provider value={{
            userAuth,
            setUserAuth,
            setError,
            error,
            success,
            setSuccess,
            setLoading,
            loading
        }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(UserAuthContext)
}
