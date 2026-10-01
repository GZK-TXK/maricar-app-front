import { useNavigate } from 'react-router'

export const PublicCardCar = ({ car }) => {
    const navigate = useNavigate()
    const imgUrl = car.imageUrl || "https://placehold.co/400x260?text=Sin+imagen"

    return (
        <article className="car-card">
            <div className="car-card__image">
                <img src={imgUrl} alt={`${car.brand} ${car.model}`} />
                <span className={`car-card__badge ${car.available ? 'is-available' : 'is-unavailable'}`}>
                    {car.available ? 'Disponible' : 'No disponible'}
                </span>
            </div>
            <div className="car-card__body">
                <h3>{car.brand} {car.model}</h3>
                <p className="car-card__meta">{car.category} · {car.plate}</p>
                <div className="car-card__footer">
                    <span className="car-card__price">{car.pricePerDay}€<small>/día</small></span>
                    <button className="btn-primary btn-sm" onClick={() => navigate(`/car/${car._id}`)}>Reservar</button>
                </div>
            </div>
        </article>
    )
}