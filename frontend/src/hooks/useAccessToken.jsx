import { useState, useEffect } from "react";


export async function getNewAccessToken() {

    try {
        const res = await fetch('http://localhost:3100/refresh-token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        if (!res.ok) {
            throw new Error('Não foi possível obter Token')
        }

        const novoAccessToken = await res.json()

        if (localStorage.length) {
            localStorage.clear()
            localStorage.setItem('userAuth', novoAccessToken)
        }

        return novoAccessToken
    } catch (error) {
        console.log(error)
        return null
    }

}


export async function fetchWithAuth(url, options = {}) {

    const user = localStorage.getItem('userAuth')

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${user.access_token}`
    }

    try {

        const res = await fetch(url, options)

        if (res.status === 401) {
            localStorage.remove('userAuth')

            const newAccessToken = await getNewAccessToken()

            if (newAccessToken) {
                options.headers.Authorization = `Bearer ${newAccessToken}`
                return await fetch(url, options)
            }
        }

        return res
    } catch (error) {
        console.log(error)
    }


}