import React from 'react'
import { useParams } from 'react-router'

export const EditCar = () => {
    const { id } = useParams()

    return (
        <div>EditCar - ID: {id}</div>
    )
}