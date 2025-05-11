import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header-fix.css';

export default function Header() {
  return (
    <header className="site-header sticky-top bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          {/* Brand Logo */}
          <Link className="navbar-brand me-0 me-md-4" to="/">
            <img
              src="/assets/image/logo/logo-black.png"
              alt="RealEstate Logo"
              height="40"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/image/logo/logo-black.png";
              }}
            />
          </Link>
          
          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/properties">
                  Properties
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/agents">
                  Agents
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-medium px-3" to="/support">
                  Support
                </Link>
              </li>
            </ul>
            
            {/* Authentication Buttons */}
            <div className="d-flex gap-2 mt-3 mt-lg-0">
              <Link to="/login" className="btn btn-outline-primary">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}