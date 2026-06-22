import { useState, useEffect } from 'react'

export const useFetch = () => {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async (url,options={}) => {
        
            const resp = await fetch(url,options)
            if (!resp.ok) {
                setData({})
                setIsLoading(false)
                setError(error)
            } else {
                const data = await resp.json()
                setData(data)
                setIsLoading(false)
                setError(null)
            }
        }
    return {
        getData,
        data,
        isLoading,
        error
    }
}
