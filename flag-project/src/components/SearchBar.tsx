import React, { memo } from "react";

interface Props {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

function SearchBarBase({
  value,
  onChange,
  placeholder = "Search for a country…",
  className,
  id,
}: Props) {
  return (
    <input
      id={id}
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onChange("");
        }

      }}
      placeholder={placeholder}
      aria-label="Sök land"
      autoComplete="off"
      spellCheck={false}
      className={["search-input", className].filter(Boolean).join(" ")}
    />
  );
}

const SearchBar = memo(SearchBarBase);
export default SearchBar;
