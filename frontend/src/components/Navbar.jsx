import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import "./App.css"; // Importuj własne style CSS
import axios from "axios";

function Navbar() {
  const [user, setUser] = useState(null);

  // Fetchowanie danych użytkownika z API przy użyciu axios
  useEffect(() => {
    axios
      .get("/api/users/")
      .then((response) => {
        setUser(response.data); // Zakładamy, że API zwraca obiekt użytkownika
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // Pusta lista zależności oznacza, że efekt zostanie wykonany tylko raz po zamontowaniu komponentu

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="/images/start.png"
            alt="Logo"
            className="navbar-brand-img"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            {user?.isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/events">
                    Events
                  </Link>
                </li>
                {user?.isStaff && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin_dashboard">
                      Panel
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
          <form className="form-inline" method="get" action="/">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="q"
            />
            <button className="btn btn-pink my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav ml-2">
            {user?.isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
