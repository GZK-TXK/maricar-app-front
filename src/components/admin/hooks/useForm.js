import { useState } from 'react'

export const useForm = (initialObject = null) => {
  const [formulario, setFormulario] = useState(initialObject)
  const [enviado, setEnviado] = useState(false)

  const serializarFormulario = (form) => {
    const formData = new FormData(form)
    const fullObject = {}
    for (const [name, value] of formData) {
      fullObject[name] = value
    }
    return fullObject
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const car = serializarFormulario(ev.target)
    setFormulario(car)
    setEnviado(true)
  }

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target
    setFormulario((prev) => ({
      ...(prev || {}),
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return {
    formulario,
    handleSubmit,
    handleChange,
    setFormulario,
    enviado
  }
}