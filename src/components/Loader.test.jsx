import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loader } from './Loader'

describe('Loader', () => {
    it('muestra el label por defecto', () => {
        render(<Loader />)
        expect(screen.getByText('Cargando...')).toBeInTheDocument()
    })

    it('muestra un label personalizado', () => {
        render(<Loader label="Espera..." />)
        expect(screen.getByText('Espera...')).toBeInTheDocument()
    })
})