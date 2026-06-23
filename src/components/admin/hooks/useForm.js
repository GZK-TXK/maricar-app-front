import { useState } from 'react'

export const useForm = (initialObject=null) => {
  const [formulario, setFormulario] = useState(initialObject)

  const [enviado, setEnviado] = useState(false)
  //recoger datos del formulario
  const serializarFormulario = (form) => {
    const formData = new FormData(form)
    const fullObject = {}
    for (let [name, value] of formData){
      console.log(name, value)
    fullObject[name] = value
  }
  return fullObject;
}
//manejar submit
  const handleSubmit = (ev) => {
    ev.preventDefault()
    const form = ev.target;
    let car= serializarFormulario(form)
    setFormulario(car)
  }

  //manejar change para editar cars
  const handleChange = (ev) =>{
    const {name,value,type,checked}= ev.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return {
    formulario,
    handleSubmit,
    handleChange,
    setFormulario,
    enviado
  }
}

