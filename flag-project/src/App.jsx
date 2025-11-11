import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout.jsx"; 

// pages
import Home, {homeLoader} from "./pages/Home.jsx";
import CountryPage, {countryLoader} from "./pages/CountryPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
  <Route index element={<Home />} loader={homeLoader} />
  <Route path="country/:name" element={<CountryPage />} loader={countryLoader} />
  </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
