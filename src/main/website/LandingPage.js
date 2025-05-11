import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { _fetchProperties } from "../libs/functions/fetches";

export default function LandingPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ area: "", priceRange: "" });

  useEffect(() => {
    fetchApprovedProperties();
  }, []);

  const fetchApprovedProperties = async () => {
    setLoading(true);
    try {
      const results = await _fetchProperties();
      if (results && results.success !== 0) {
        // Sort by creation date (newest first)
        const sortedProperties = results.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        // Filter only approved properties
        const approvedProperties = sortedProperties.filter(property => property.isApproved);
        setProperties(approvedProperties);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const filteredProperties = properties.filter(property => {
    // Filter by area if area filter is set
    if (filter.area && !property.digitalAddress?.toLowerCase().includes(filter.area.toLowerCase())) {
      return false;
    }
    
    // Filter by price range if price range filter is set
    if (filter.priceRange) {
      const price = parseFloat(property.price.replace(/[^0-9.]/g, ''));
      const [min, max] = filter.priceRange.split('-').map(val => parseFloat(val.trim()));
      if (price < min || (max && price > max)) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="site-wrapper overflow-hidden position-relative">
      {/* Header */}
      <header className="site-header site-header--menu-right site-header--sticky">
        <div className="container">
          <nav className="navbar site-navbar">
            {/* Brand Logo */}
            <div className="brand-logo">
              <Link to="/">
                <img
                  src="../assets/image/logo/logo-black.png"
                  alt="RealEstate Logo"
                  className="light-version-logo"
                />
              </Link>
            </div>
            <div className="header-btn ms-auto d-flex align-items-center">
              <Link to="/register" className="btn btn-style-03 me-3">
                Register
              </Link>
              <Link to="/" className="btn btn-style-01">
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section bg-gradient-1 pt-5 pb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <h1 className="display-4 fw-bold mb-4">Find Your Dream Property</h1>
              <p className="lead mb-5">
                Discover the perfect home with our extensive listings of properties.
                Whether you're looking to buy, rent, or sell, we've got you covered.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started
              </Link>
            </div>
            <div className="col-lg-6 col-md-12">
              <img
                src="../assets/image/hero-image.svg"
                alt="Modern Real Estate Property"
                className="img-fluid rounded shadow-lg"
                loading="eager"
                width="800"
                height="600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-6 mb-3 mb-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search by location, area, or address"
                name="area"
                value={filter.area}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <select 
                className="form-control"
                name="priceRange"
                value={filter.priceRange}
                onChange={handleFilterChange}
              >
                <option value="">Filter by Price Range</option>
                <option value="0-50000">Under GHC 50,000</option>
                <option value="50000-100000">GHC 50,000 - 100,000</option>
                <option value="100000-200000">GHC 100,000 - 200,000</option>
                <option value="200000-500000">GHC 200,000 - 500,000</option>
                <option value="500000-1000000">GHC 500,000 - 1,000,000</option>
                <option value="1000000-">Above GHC 1,000,000</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="properties-section py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Featured Properties</h2>
          
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="row">
              {filteredProperties.map((property, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={property._id || index}>
                  <div className="card property-card h-100 shadow-sm">
                    <div className="property-image position-relative">
                      <img
                        src={property.images?.image1 || "../assets/image/property-placeholder.jpg"}
                        className="card-img-top"
                        alt={property.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="property-tag position-absolute top-0 end-0 bg-primary text-white px-3 py-1 m-2 rounded">
                        {property.rentOrSale || "For Sale"}
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{property.name}</h5>
                      <h6 className="text-success">GHC {property.price}</h6>
                      <p className="card-text text-muted mb-2">
                        <i className="fa fa-map-marker-alt me-2"></i>
                        {property.digitalAddress || "Location not specified"}
                      </p>
                      <p className="card-text small mb-3">
                        {property.propDescription?.substring(0, 100)}...
                      </p>
                      <div className="d-flex justify-content-between border-top pt-3">
                        <span title="Bedrooms">
                          <i className="fa fa-bed me-1"></i>
                          {property.others?.noOfBedrooms || "N/A"}
                        </span>
                        <span title="Bathrooms">
                          <i className="fa fa-shower me-1"></i>
                          {property.others?.bathrooms || "N/A"}
                        </span>
                        <span title="Square Feet">
                          <i className="fa fa-home me-1"></i>
                          {property.squareFt || "N/A"}
                        </span>
                        <span title="Parking">
                          <i className="fa fa-car me-1"></i>
                          {property.carPark ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                    <div className="card-footer bg-white border-top-0">
                      <Link 
                        to="/" 
                        className="btn btn-outline-primary w-100"
                        onClick={(e) => {
                          e.preventDefault();
                          // Redirect to login first since user needs to be authenticated
                          window.location.href = "/";
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <h4>No properties found matching your criteria</h4>
              <p>Try adjusting your filters or check back later for new listings</p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-7">
              <h2 className="mb-2">Ready to find your perfect property?</h2>
              <p className="mb-lg-0">Sign up now to save favorites and get personalized recommendations.</p>
            </div>
            <div className="col-lg-4 col-md-5 text-md-end">
              <Link to="/register" className="btn btn-light btn-lg">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section pt-5 pb-3 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <h5>About Us</h5>
              <p>We are dedicated to providing the best real estate services to our clients, helping them find their dream properties.</p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white">Home</Link></li>
                <li><Link to="/" className="text-white">Properties</Link></li>
                <li><Link to="/" className="text-white">Agents</Link></li>
                <li><Link to="/" className="text-white">Contact</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5>Contact Info</h5>
              <ul className="list-unstyled">
                <li><i className="fa fa-map-marker-alt me-2"></i> 123 Real Estate St, Accra</li>
                <li><i className="fa fa-phone me-2"></i> +233 123 456 789</li>
                <li><i className="fa fa-envelope me-2"></i> info@realestate.com</li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5>Follow Us</h5>
              <div className="social-icons">
                <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white me-3"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <p className="mb-0">© {new Date().getFullYear()} RealEstate. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}