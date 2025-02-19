import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";

import verifyToken from "./useVerifyToken";


function useAuth() {



    const { setError, setSuccess, setUserAuth, setLoading } = useAuthContext()

    // logica de criar o usuário
    async function signUp(userInfos) {

        let { name, email, password } = userInfos

        setLoading(true)
        setError('')

        try {
            const userCredentials = JSON.stringify({ name, email, password })

            const res = await fetch("http://localhost:3100/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userCredentials,
                credentials: 'include'
            })

            // console.log(await res.json())

            if (!res.ok) {
                throw new Error((await res.json()).message)
            }

            const userData = await res.json()

            // Adicionando dados do usuário em um context
            setUserAuth(userData)
            setSuccess(userData.message)
            setLoading(false)
            return true

        } catch (error) {
            setError(error.message)
            setLoading(false)
            return false
        }

    }

    async function login(userInfos) {
        const { email, password } = userInfos

        setLoading(true)
        setError('')

        try {
            const res = await fetch("http://localhost:3100/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error((await res.json()).message)
            }

            const userData = await res.json()
            setUserAuth(userData)
            setSuccess(userData.message)
            setLoading(false)
            return true
        } catch (error) {
            setError(error.message)
            setLoading(false)
            return false
        }
    }

    async function signOut() {

        setLoading(true)

        try {
            const res = await fetch('http://localhost:3100/signout', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            })


            if (!res.ok) throw new Error((await res.json()).message)

            // const userData = await res.json()
            setUserAuth(null)
            localStorage.removeItem('userAuth')
            return true

        } catch (error) {
            setError(error.message)
            return false
        } finally {
            setLoading(false)
        }

    }

    return { signUp, login, signOut }

}

export default useAuth