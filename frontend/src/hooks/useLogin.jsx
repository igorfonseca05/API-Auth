import { useState } from "react";

async function useLogin(usersInfo) {

    // const { email, password } = usersInfo

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [user, setUser] = useState(null)


    // try {
    //     setLoading(true)
    //     setError('')
    //     const res = await fetch("http://localhost:3100/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         // body: JSON.stringify({ email, password }),
    //         credentials: 'include'
    //     })

    //     if (!res.ok) {
    //         throw new Error('Falha ao fazer login')
    //     }

    //     const userData = await res.json()
    //     setUser(userData)
    //     setSuccess(userData.message)

    // } catch (error) {
    //     setError(error.message)
    // } finally {
    //     setLoading(false)
    // }

    return { user, error, loading, success }

}

export default useLogin