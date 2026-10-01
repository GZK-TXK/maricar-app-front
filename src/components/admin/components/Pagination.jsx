export const Pagination = ({ pagination, onPageChange }) => {
    if (!pagination || pagination.totalPages <= 1) return null

    return (
        <div className="pagination">
            <button
                className="btn-secondary btn-sm"
                disabled={pagination.page <= 1}
                onClick={() => onPageChange(pagination.page - 1)}
            >
                Anterior
            </button>
            <span>Página {pagination.page} de {pagination.totalPages}</span>
            <button
                className="btn-secondary btn-sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => onPageChange(pagination.page + 1)}
            >
                Siguiente
            </button>
        </div>
    )
}