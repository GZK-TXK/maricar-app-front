import { useEffect, useRef } from "react"
import flatpickr from "flatpickr"
import 'flatpickr/dist/flatpickr.min.css'

export const useFlatpickr = (ref, options = {}, deps= []) => {
    const instanceRef= useRef(null)
    useEffect(()=>{
        if(!ref.current) return
        if(instanceRef.current) instanceRef.current.destroy()
        instanceRef.current = flatpickr(ref.current, options)
    return ()=>{
        if(instanceRef.current) instanceRef.current.destroy()
    }
    },deps)
  return instanceRef
}
