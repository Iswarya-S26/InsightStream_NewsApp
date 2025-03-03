import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect route changes

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Clear search input when the route changes
  useEffect(() => {
    setSearchQuery(""); // Reset search field
  }, [location.pathname]);

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            News Api
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Homee
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/business">
                  Business
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/entertainment">
                  Entertainment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/general">
                  General
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/health">
                  Health
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/science">
                  Science
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sports">
                  Sports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/technology">
                  Technology
                </NavLink>
              </li>
            </ul>

            {/* Search Form */}
            <form className="d-flex" onSubmit={handleSearch}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
