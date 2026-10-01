import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
    it('no renderiza si solo hay una página', () => {
        const { container } = render(
            <Pagination pagination={{ page: 1, totalPages: 1 }} onPageChange={() => {}} />
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('llama onPageChange al pulsar Siguiente', () => {
        const onPageChange = vi.fn()
        render(<Pagination pagination={{ page: 1, totalPages: 3 }} onPageChange={onPageChange} />)
        fireEvent.click(screen.getByText('Siguiente'))
        expect(onPageChange).toHaveBeenCalledWith(2)
    })
})