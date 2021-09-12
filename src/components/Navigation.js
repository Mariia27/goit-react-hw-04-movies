import { NavLink, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  console.log("NAVIGATION", location);
  return (
    <nav className="lol">
      <ul className="navigation g-ul">
        <li className="listNav">
          <NavLink
            exact
            to={{
              pathname: "/",
              state: { from: location },
            }}
            className="g-a button"
            activeClassName="activeLinkNav"
          >
            Головна
          </NavLink>
        </li>
        <li className="listNav">
          <NavLink
            to="/movies"
            className="g-a button"
            activeClassName="activeLinkNav"
          >
            Фільми
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
