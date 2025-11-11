import CountryCard from "./CountryCard";

export default function CountriesGrid({ countries }) {
  if (!countries || countries.length === 0) {
    return <p className="empty">Inga träffar.</p>;
  }
  return (
    <div className="countries-grid">
      {countries.map((c) => (
        <CountryCard key={c.cca3} country={c} />
      ))}
    </div>
  );
}
