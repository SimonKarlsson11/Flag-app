import { useLoaderData, Link, useNavigation } from "react-router-dom";

export default function CountryPage() {
  const { country, neighbors } = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  if (loading) {
    return (
      <div className="country-page">
        <Link className="back-btn" to="/">Back</Link>
        <div className="country-layout">
          <div className="flag shimmer" />
          <div className="info">
            <div className="shimmer line xl" />
            <div className="shimmer line" />
            <div className="shimmer line" />
            <div className="shimmer line" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="country-page">
      <Link className="back-btn" to="/">← Back</Link>

      <div className="country-layout">
        <div className="flag">
          <img
            src={country.flags.svg || country.flags.png}
            alt={`${country.name.common} flag`}
          />
        </div>

        <div className="info">
          <h1>{country.name.common}</h1>

          <div className="facts">
            <p><strong>Native Name:</strong> {getNativeName(country)}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString("sv-SE")}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Sub Region:</strong> {country.subregion || "—"}</p>
            <p><strong>Capital:</strong> {(country.capital && country.capital[0]) || "—"}</p>
            <p><strong>TLD:</strong> {(country.tld && country.tld[0]) || "—"}</p>
            <p><strong>Currencies:</strong> {listCurrencies(country.currencies)}</p>
            <p><strong>Languages:</strong> {listLanguages(country.languages)}</p>
          </div>

          <div className="borders">
            <strong>Border Countries:</strong>
            <div className="chips">
              {neighbors.length
                ? neighbors.map((n) => (
                    <Link
                      key={n.cca3}
                      className="chip"
                      to={`/country/${encodeURIComponent(n.name.common)}`}
                    >
                      {n.name.common}
                    </Link>
                  ))
                : <span>Inga grannländer</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Hjälpare */
function getNativeName(country) {
  const native = country.name?.nativeName;
  if (!native) return "—";
  const first = Object.values(native)[0];
  return first?.common || "—";
}
function listCurrencies(currencies) {
  if (!currencies) return "—";
  return Object.values(currencies).map((c) => c.name).join(", ");
}
function listLanguages(languages) {
  if (!languages) return "—";
  return Object.values(languages).join(", ");
}

/* Loader */
export async function countryLoader({ params }) {
  const name = params.name;
  const BASE = "https://restcountries.com/v3.1";
  const FIELDS =
    "name,flags,region,subregion,capital,population,tld,currencies,languages,borders,cca3";

  const res = await fetch(
    `${BASE}/name/${encodeURIComponent(name)}?fullText=true&fields=${FIELDS}`
  );
  if (res.status === 404) {
    throw new Response("Hittade inte landet", { status: 404 });
  }
  if (!res.ok) throw new Error("Kunde inte hämta landet");
  const [country] = await res.json();

  let neighbors = [];
  if (country.borders?.length) {
    const codes = country.borders.join(",");
    const r2 = await fetch(`${BASE}/alpha?codes=${codes}&fields=name,cca3`);
    if (r2.ok) neighbors = await r2.json();
  }

  return { country, neighbors };
}
