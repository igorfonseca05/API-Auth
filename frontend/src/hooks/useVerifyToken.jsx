import { useState, useEffect } from "react"

import { useAuthContext } from "../Context/AuthContext"

function verifyToken() {

    const { setError } = useAuthContext()

    const [verifiedUser, setVerifiedUser] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        async function analyseToken() {
            setError('')
            setLoading(true)

            try {
                const res = await fetch('http://localhost:3100/validate-token', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    credentials: "include"
                })

                if (!res.ok) {
                    throw new Error((await res.json()).message)
                }

                const userData = await res.json()
                setVerifiedUser(userData)
                setLoading(false)
            } catch (error) {
                localStorage.removeItem('userAuth')
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