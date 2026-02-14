import { useNavigate } from "react-router-dom";

export default function CityCard({ city }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      style={{ backgroundImage: `url(${city.image_url})` }}
      onClick={() => navigate(`/cidade/${city.id}`)}
    >
      <h3>{city.name}</h3>
      <p>
        {city.tickets_available ? "INGRESSOS DISPONÍVEIS" : "ESGOTADO"}
      </p>
    </div>
  );
}
