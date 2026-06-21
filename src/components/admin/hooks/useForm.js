import { useState } from 'react'

export const useForm = (initialObject = {}) => {
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
    let car= serializarFormulario(ev.target)
    setFormulario(car)
    setEnviado(true)
  }
//manejar cambios 
  const handleChange = (e)=>{
    const [name,value] = e.target.value
    setFormulario({
      ...formulario,
      [name]: value
    })
  }
  return {
    formulario,
    handleSubmit,
    handleChange,
    enviado
  }
}

