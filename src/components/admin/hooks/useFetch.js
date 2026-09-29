import { useState } from 'react'

export const useFetch = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async (url, options = {}) => {
        setIsLoading(true)
        try {
            const resp = await fetch(url, { credentials: "include", ...options })
            const result = await resp.json().catch(() => ({}))
            if (!resp.ok) {
                setData(null)
                setError(result)
            } else {
                setData(result)
                setError(null)
            }
        } catch (err) {
            setData(null)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        getData,
        data,
        isLoading,
        error
    }
}