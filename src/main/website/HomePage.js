import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { _fetchProperties } from '../libs/functions/fetches';
import PropertyListing from './components/PropertyListing';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchApprovedProperties();
  }, []); // Empty dependency array ensures this only runs once on mount
  const fetchApprovedProperties = async () => {
    
    setLoading(true);
    try {
      const results = await _fetchProperties();
      if (results && results.success !== 0) {
        // Filter only approved properties
        const approvedProperties = results.data.filter(property => property.isApproved);
        
        // Sort by creation date (newest first)
        const sortedProperties = approvedProperties.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        // Apply limit if specified
        // const limitedProperties = limit > 0 ? sortedProperties.slice(0, limit) : sortedProperties;
        setProperties(sortedProperties);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    }
    setLoading(false);
  };
  return (
    <div className="site-wrapper overflow-hidden position-relative">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-primary text-white py-5" style={{ marginTop: "60px" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-4">Find Your Dream Home</h1>
              <p className="lead mb-5">
                Discover the perfect property with our extensive listings. 
                Whether you're looking to buy or rent, we've got you covered.
              </p>
              <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-light btn-lg">
                  Get Started
                </Link>
                <Link to="/properties" className="btn btn-outline-light btn-lg">
                  Browse Properties
                </Link>
              </div>
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
      </section>

      {/* Search Section */}
      <section className="search-section py-5 bg-light">
        <div className="container">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h4 className="mb-4">Find Your Perfect Property</h4>
              <PropertyListing featured={true} limit={6} properties={properties} loading={loading} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="featured-properties py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-8">
              <h2 className="section-title">Featured Properties</h2>
              <p className="text-muted">Explore our handpicked selection of premium properties</p>
            </div>
            <div className="col-md-4 text-md-end">
              <Link to="/properties" className="btn btn-outline-primary">
                View All Properties
              </Link>
            </div>
          </div>
          
          <PropertyListing featured={true} limit={6} properties={properties} loading={loading}/>
        </div>
      </section>

      {/* All Properties Section */}
      <section className="all-properties py-5 bg-light">
        <div className="container">
          <h2 className="section-title mb-4">All Properties</h2>
          
          <PropertyListing properties={properties} loading={loading}/>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="text-muted">We provide the best real estate experience</p>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fa fa-home fa-3x text-primary"></i>
                  </div>
                  <h4>Wide Range of Properties</h4>
                  <p className="text-muted">Explore our extensive collection of properties to find your perfect match.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fa fa-dollar-sign fa-3x text-primary"></i>
                  </div>
                  <h4>Best Price Guarantee</h4>
                  <p className="text-muted">We ensure you get the best value for your investment with our competitive pricing.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fa fa-user-tie fa-3x text-primary"></i>
                  </div>
                  <h4>Expert Agents</h4>
                  <p className="text-muted">Our professional agents are here to guide you through every step of your property journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-md-8">
              <h3 className="mb-2">Ready to Find Your Dream Property?</h3>
              <p className="mb-lg-0">Join us today and discover the perfect home that suits your needs.</p>
            </div>
            <div className="col-lg-3 col-md-4 text-md-end">
              <Link to="/register" className="btn btn-light btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}