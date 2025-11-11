import { useLoaderData } from "react-router-dom";
import Controls from "../components/Controls";
import CountriesGrid from "../components/CountriesGrid";




const Home = () => {
  const countries = useLoaderData();
  console.log("länder:", countries.length);


  return ( 
  <div className="home-page"> 
  <Controls /> 
  <CountriesGrid countries={countries} />
  </div> 
  );
}

// pages/Home.jsx
export const homeLoader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim();
  const region = url.searchParams.get("region")?.trim();

  const BASE = "https://restcountries.com/v3.1";
  const FIELDS = "name,flags,region,population,capital,cca3";

  let endpoint;
  if (q) {
    endpoint = `${BASE}/name/${encodeURIComponent(q)}?fields=${FIELDS}`;
  } else if (region) {
    endpoint = `${BASE}/region/${encodeURIComponent(region)}?fields=${FIELDS}`;
  } else {
    endpoint = `${BASE}/all?fields=${FIELDS}`;
  }

  const res = await fetch(endpoint, { signal: request.signal });

  if (res.status === 404) return [];

  if (!res.ok) {
    throw new Error("Det gick inte att hämta länderna");
  }

  return res.json();
};


export default Home;