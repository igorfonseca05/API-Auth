import { useState, useEffect, createContext, useContext } from 'react'
import useAuth from '../hooks/useAuth'
// import { deleteMany } from '../../../backend/src/models/userModel'

export const UserAuthContext = createContext()

export function UserAuthContextProvider({ children }) {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const [userAuth, setUserAuth] = useState(null)

    // Salvando dados usuário no localStorage
    useEffect(() => {
        if (userAuth) {
            localStorage.setItem('userAuth', JSON.stringify(userAuth))
            return
        }

    }, [userAuth])

    // Obtendo dados do localStorage caso ele já exista
    useEffect(() => {
        if (localStorage.length) {
            const userSaved = JSON.parse(localStorage.getItem('userAuth'))
            setUserAuth(userSaved)
        }
    }, [])

    return (
        <UserAuthContext.Provider value={{ userAuth, setUserAuth, setError, error, success, setSuccess }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(UserAuthContext)
}
