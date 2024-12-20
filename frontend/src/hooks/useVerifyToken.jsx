import { useState, useEffect } from "react"

import { useAuthContext } from "../Context/AuthContext"

function verifyToken() {

    const { setError } = useAuthContext()

    const [verifiedUser, setVerifiedUser] = useState(false)
    const [loading, setLoading] = useState(false)

    // console.log(localStorage.getItem())


    const newAccessToken = async function getNewAccessToken() {
        try {

            const res = await fetch('http://localhost:3100/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error((await res.json()).message)
            }

            const data = await res.json()
            localStorage.setItem('userAuth', JSON.stringify(data))
            // console.log('novo acccess toke gerado')
            return data?.user.access_token

        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }


    // Verificando se o token é válido
    useEffect(() => {

        if (!JSON.parse(localStorage.getItem('userAuth'))) {
            setVerifiedUser(false)
            setLoading(false)
            return
        }

        async function analyseToken() {
            setError('')
            setLoading(true)

            try {
                const { user } = JSON.parse(localStorage.getItem('userAuth'))

                const res = await fetch('http://localhost:3100/verifyToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.access_token}`
                    }
                })

                if (!res.ok) {
                    // Criar novo AccessToken
                    if (res.status === 401) {

                        const accessToken = await newAccessToken()

                        if (accessToken) {
                            analyseToken()
                        }

                        return
                    }

                    throw new Error((await res.json()).message)
                }

                const userData = await res.json()
                // setVerifiedUser(userData)
                localStorage.setItem('userAuth', JSON.stringify(userData))
                // console.log('recriado')
                return userData
            } catch (error) {
                console.log(error)
                localStorage.removeItem('userAuth')

                // if (error.status === 401) {
                //     console.log('error 401')
                //     newAccessToken()
                //     return
                // }

                setError(error.message)
                // setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        analyseToken()
    }, [])


    return { verifiedUser, loading }

}

export default verifyToken