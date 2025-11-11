import { Link } from "react-router-dom";

export default function CountryCard({ country }) {

const { name, flags, population, region, capital } = country;
const capitalName = Array.isArray(capital) ? capital[0] : capital;

    return (
        <Link className="country-card" to={`/country/${encodeURIComponent(name.common)}`}>
        <div className="flag" aria-hidden>
            <img src={flags.svg || flags.png} alt={`${name.common} flag`} />
        </div>
        <div className="meta">
        <h3 className="title">{name.common}</h3>
        <p><strong>Population:</strong> {population.toLocaleString("sv-SE")}</p>
        <p><strong>Region:</strong> {region}</p>
        <p><strong>Capital:</strong> {capitalName || "—"}</p>
        </div>
        </Link>
    );

}