import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async () => {
        setTimeout(async () => {
            setData(null)
            setIsLoading(true)
            setError(null)
            const resp = await fetch(url)
            if (!resp.ok) {
                setData(null)
                setIsLoading(false)
                setError(resp.statusText || "Error en la petición")
            } else {
                const data = await resp.json()
                setData(data)
                setIsLoading(false)
                setError(null)
            }
        }, 3600)
    }
    useEffect(() => {
        getData()
    }, [url])
    return {
        data,
        isLoading,
        error
    }
}
