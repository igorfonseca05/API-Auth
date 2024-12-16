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




    } catch (error) {

    }

}