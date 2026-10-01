import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'

const Boom = () => {
    throw new Error('boom')
}

describe('ErrorBoundary', () => {
    it('muestra el fallback cuando un hijo lanza error', () => {
        vi.spyOn(console, 'error').mockImplementation(() => {})
        render(<ErrorBoundary><Boom /></ErrorBoundary>)
        expect(screen.getByText('Algo ha ido mal')).toBeInTheDocument()
        expect(screen.getByText('boom')).toBeInTheDocument()
        vi.restoreAllMocks()
    })
})