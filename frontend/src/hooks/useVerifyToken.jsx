import { useState, useEffect } from "react"

import { useAuthContext } from "../Context/AuthContext"

function verifyToken() {

    const { setError } = useAuthContext()

    const [verifiedUser, setVerifiedUser] = useState(false)
    const [loading, setLoading] = useState(false)

    const [user, setUser] = useState((JSON.parse(localStorage.getItem('userAuth')))?.user)
    const [token, setTokenExpired] = useState(false)

    // console.log(user)

    // console.log(localStorage.getItem())

    function removeUserIfError() {
        localStorage.removeItem('userAuth')
    }

    function saveUserData(userData) {
        localStorage.setItem('userAuth', JSON.stringify(userData))
    }

    function SwitchingAccessTokenByNewAccessToken(token) {
        const data = JSON.parse(localStorage.getItem('userAuth'))
        delete data.user.access_token
        const newUser = { ...data, user: { ...data.user, access_token: token } }
        saveUserData(newUser)
    }

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
            localStorage.clear()
            setError(error.message)
        }
    }

    async function analyseToken() {
        setError('')
        setLoading(true)

        try {
            // Obterá o accessToken do login ou o retornado pela rota do refreshToken

            const res = await fetch('http://localhost:3100/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.access_token}`
                },
                credentials: "include"
            })

            if (!res.ok) {
                if (res.status === 401) {

                    // Gerar novo AccessToken se expirado
                    const getNewAccessToken = await newAccessToken()

                    // Se o novo accessToken for gerado, refaça a analise da validade do Access Token
                    if (getNewAccessToken) {
                        // Alterando valor do access token para novo valor
                        SwitchingAccessTokenByNewAccessToken(getNewAccessToken)
                        analyseToken()
                    }

                    return
                }

                throw new Error((await res.json()).message)
            }

            // Com o novo access Token, obteremos a resposta de que token é válido
            const userData = await res.json()
            saveUserData(userData)

        } catch (error) {
            removeUserIfError()
            // console.log(error)
            setError(error.message)
            // setTimeout(() => { location.reload() }, 3000)

        } finally {
            setLoading(false)
        }
    }

    function verifyIfAccessTokenExpired(user) {
        const accessToken = (user.access_token).split(".")[1] /**Obtendo accessToken */
        const decodedAcessToken = JSON.parse(atob(accessToken))  /**Decodificando token */
        const actualTime = Math.floor(new Date() / 1000) /**Obtendo hora em segundos */

        return decodedAcessToken.exp < actualTime /**Verificando se token expirou */
    }

    useEffect(() => {

        if (!user) {
            setVerifiedUser(false)
            setLoading(false)
            return
        }

        const isTokenExpired = verifyIfAccessTokenExpired(user)
        // console.log(isTokenExpired)

        if (isTokenExpired) {
            analyseToken()
        }

    }, [])


    return { verifiedUser, loading }

}

export default verifyToken