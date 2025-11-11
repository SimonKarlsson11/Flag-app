import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";

export default function Controls() {
  const [params, setParams] = useSearchParams();

  const qParam = params.get("q") || "";

  const [draft, setDraft] = useState(qParam);

  useEffect(() => {
    setDraft(qParam);
  }, [qParam]);

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (draft.trim()) {
        next.set("q", draft.trim());
        next.delete("region");
      } else {
        next.delete("q");
      }

      if (next.toString() !== params.toString()) {
        setParams(next);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [draft, params, setParams]);

  const regionParam = params.get("region") || "";
  const handleRegionChange = (next) => {
    const nextParams = new URLSearchParams(params);
    if (next) {
      nextParams.set("region", next);
      nextParams.delete("q");
    } else {
      nextParams.delete("region");
    }
    if (nextParams.toString() !== params.toString()) setParams(nextParams);
  };

  return (
    <div className="controls">
      <div className="search-wrapper">
        <SearchBar value={draft} onChange={setDraft} />
      </div>

        <RegionFilter value={regionParam} onChange={handleRegionChange} />
    </div>
  );
}
