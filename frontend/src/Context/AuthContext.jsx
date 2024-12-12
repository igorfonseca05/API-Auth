import { useState, useEffect, createContext, useContext } from 'react'
import useAuth from '../hooks/useAuth'
// import { deleteMany } from '../../../backend/src/models/userModel'

export const UserAuthContext = createContext()

export function UserAuthContextProvider({ children }) {

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const [userAuth, setUserAuth] = useState(null)

    // console.log(userAuth)

    // Salvando dados usuário no localStorage
    useEffect(() => {
        userAuth && localStorage.setItem('userAuth', JSON.stringify(userAuth))
    }, [userAuth])

    // Obtendo dados do localStorage caso ele já exista
    useEffect(() => {
        setUserAuth(JSON.parse(localStorage.getItem('userAuth')))
    }, [])

    // console.log(userAuth)

    return (
        <UserAuthContext.Provider value={{ userAuth, setUserAuth, setError, error, success, setSuccess }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(UserAuthContext)
}


// const [loading, setLoading] = useState(false)
// const [error, setError] = useState(null)
// const [success, setSuccess] = useState(null)

// // Obtendo dados do usuário
// const [verifyUserToken, setVerifyUserToken] = useState(null)
// const [userAuth, setUserAuth] = useState(null)


// function deleteUserToken() {
//     localStorage.removeItem('userAuth')
// }

// // Validando token
// async function verifyToken() {

//     setLoading(true)
//     setError('')

//     try {

//         const res = await fetch('http://localhost:3100/validate-token', {
//             method: 'POST',
//             headers: {
//                 "Content-type": "application/json"
//             },
//             credentials: "include"
//         })

//         if (!res.ok) {
//             throw new Error((await res.json()).message)
//         }

//         // const userData = await res.json()
//         localStorage.setItem('userAuth', JSON.stringify(verifyUserToken))
//         setUserAuth(verifyUserToken)
//     } catch (error) {
//         deleteUserToken()
//         setError(error.message)
//         // redirect('/login')
//         setUserAuth(null)
//     }
// }

// useEffect(() => {
//     if (verifyUserToken) {
//         verifyToken()
//     }
// }, [verifyUserToken])


// console.log(verifyUserToken)