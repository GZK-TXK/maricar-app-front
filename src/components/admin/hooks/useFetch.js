import { useState, useEffect } from 'react'

export const useFetch = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async (url, options = {}) => {
        try {
            const resp = await fetch(url, options)
            console.log(resp)
            const result = await resp.json()
            if (!resp.ok) {
                setData(null)
                setError(result)
                setIsLoading(false)
            } else {
                setData(result)
                setError(null)
                setIsLoading(false)
            }
        }
        catch (error) {
            setData(null)
            setError(error.message)
            console.log('Error',error)
        }
    }


    return {
        getData,
        data,
        isLoading,
        error
    }
}
