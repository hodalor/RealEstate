import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header-fix.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Listings", to: "/property-listing" },
  { label: "Support", to: "/support" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="site-header sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg site-navbar">
          <Link className="navbar-brand brand-mark" to="/">
            <span className="brand-badge">
              <i className="fa fa-building" aria-hidden="true"></i>
            </span>
            <span>
              <strong>BrightEstate</strong>
              <small>Property management, made welcoming.</small>
            </span>
          </Link>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto align-items-lg-center">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <Link className="nav-link fw-semibold px-lg-3" to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="site-header-actions mt-3 mt-lg-0" ref={menuRef}>
              <div className="site-profile-menu">
                <button
                  type="button"
                  className={`profile-trigger ${isMenuOpen ? "open" : ""}`}
                  onClick={() => setIsMenuOpen((current) => !current)}
                  aria-label="Open account menu"
                  aria-expanded={isMenuOpen}
                >
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                  <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>

                {isMenuOpen && (
                  <div className="profile-dropdown-menu">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
