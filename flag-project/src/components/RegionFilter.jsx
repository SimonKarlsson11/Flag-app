export default function RegionFilter({ value, onChange }) {

    const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

    const handleChange = (e) => {
        const next = e.target.value;
        onChange(next);

    };

    return ( 
        <select
            className="region-filter"
            aria-label="Filter by region"
            value={value || ""} 
            onChange = {handleChange}
        >
            <option value="">Filter by Regions</option>

            {regions.map((r) => (
                <option key={r} value={r}>
                    {r}
                </option>
            ))}
        </select>
    )
}