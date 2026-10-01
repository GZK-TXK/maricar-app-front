export const Loader = ({ label = "Cargando..." }) => (
    <div className="loader">
        <div className="spinner" />
        <p>{label}</p>
    </div>
)