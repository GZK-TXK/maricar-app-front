import { useState } from 'react'
import { PublicCarContainer } from '../components/PublicCarContainer'
import { CarFilters } from '../components/CarFilters'

const EMPTY_FILTERS = { category: '', minPrice: '', maxPrice: '', search: '', startDate: '', endDate: '' }
const PAGE_SIZE = 6

export const Cars = () => {
    const [filters, setFilters] = useState(EMPTY_FILTERS)
    const [page, setPage] = useState(1)

    const handleFilters = (next) => {
        setFilters(next)
        setPage(1)
    }

    return (
        <main className="main-content">
            <h2>Nuestros coches</h2>
            <CarFilters filters={filters} onChange={handleFilters} />
            <PublicCarContainer
                filters={filters}
                page={page}
                limit={PAGE_SIZE}
                onPageChange={setPage}
            />
        </main>
    )
}