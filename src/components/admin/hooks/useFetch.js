import { useState, useEffect } from 'react'

export const useFetch = () => {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async (url,options={}) => {
            try{
                const resp= await fetch(url, options)
                const result= await resp.json()
                if(!resp.ok){
                    setData({})
                    setError(result)
                    setIsLoading(false)
                } else{
                    setData(result)
                    setError(null)
                    setIsLoading(false)
                }
            }
            catch(error){
                setData({})
                setError(error.message)
            } 
        }
    return {
        getData,
        data,
        isLoading,
        error
    }
}
