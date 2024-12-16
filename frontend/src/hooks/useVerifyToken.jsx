import { useState, useEffect } from "react"

import { useAuthContext } from "../Context/AuthContext"

function verifyToken() {

    const { setError } = useAuthContext()

    const [verifiedUser, setVerifiedUser] = useState(false)
    const [loading, setLoading] = useState(false)

    // console.log(localStorage.getItem())


    useEffect(() => {
        async function analyseToken() {
            setError('')
            setLoading(true)

            const user = JSON.parse(localStorage.getItem('userAuth'))

            try {
                const res = await fetch('http://localhost:3100/accessToken', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    Authorization: `Bearer ${user.access_token}`,
                    credentials: "include"
                })

                if (!res.ok) {
                    throw new Error((await res.json()).message)
                }

                const userData = await res.json()

                console.log(userData)
                // setVerifiedUser(userData)
                // setLoading(false)
            } catch (error) {
                console.log(error)
                // localStorage.removeItem('userAuth')
                // setError(error.message)
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