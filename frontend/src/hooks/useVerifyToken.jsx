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
            return data?.access_token

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
                // Obterá o accessToken do login ou o retornado pela rota do refreshToken
                const { user } = JSON.parse(localStorage.getItem('userAuth'))

                const res = await fetch('http://localhost:3100/verifyToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.access_token}`
                    }
                })

                if (!res.ok) {
                    // Gerar novo AccessToken
                    if (res.status === 401) {

                        const getNewAccessToken = await newAccessToken()

                        // Se o novo accessToken for gerado, refaça a analise da validade do Access Token
                        if (getNewAccessToken) {
                            const data = JSON.parse(localStorage.getItem('userAuth'))
                            delete data.user.access_token
                            const newUser = { ...data, user: { ...data.user, access_token: getNewAccessToken } }
                            localStorage.setItem('userAuth', JSON.stringify(newUser))

                            analyseToken()
                        }
                        return
                    }

                    throw new Error((await res.json()).message)
                }

                const userData = await res.json()
                localStorage.setItem('userAuth', JSON.stringify(userData))
                return userData

            } catch (error) {
                // console.log(error)
                // localStorage.removeItem('userAuth')
            } finally {
                setLoading(false)
            }
        }

        analyseToken()
    }, [])


    return { verifiedUser, loading }

}

export default verifyToken