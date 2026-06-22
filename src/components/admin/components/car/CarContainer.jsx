import React, { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'

export const CarContainer = () => {
  const { getData, data, isLoading, error }= useFetch()
  const llamadaApi = async ()=>{
    const url= import.meta.env.VITE_API_URLBASE
    await getData(`${url}/cars`)
  }
  useEffect(() => {
    llamadaApi()  
  }, [])
  
  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
    
  )
}
