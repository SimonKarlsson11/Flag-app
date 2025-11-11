import { Outlet, NavLink, Link } from "react-router-dom";
import logo from "../assets/techover-logo-dark.png";
import moon from "../assets/moon-bordered.svg";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <div className="navbar">
          <h2 className="flag-text"> The Flag App </h2>
          <img src={logo} alt="Techover logo" className="techover-logo-dark" />
          <div className="dark-toggle">
            <button className="dark-button">
              <img src={moon} alt="moon" />
            </button>
            <h3 className="dark-text"> Dark Mode </h3>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
