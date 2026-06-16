import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { _fetchProperties } from "../libs/functions/fetches";
import { formatPriceWithCurrency, getDisplayCurrency } from "../libs/data/siteSettings";
import { resolveImageUrl } from "../libs/functions/images";
import useSiteSettings from "../libs/hooks/useSiteSettings";

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [recentPage, setRecentPage] = useState(1);
  const { siteSettings } = useSiteSettings();

  useEffect(() => {
    const fetchApprovedProperties = async () => {
      setLoading(true);

      try {
        const results = await _fetchProperties();

        if (results && results.success !== 0) {
          const approvedProperties = results.data
            .filter((property) => property.isApproved)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setProperties(approvedProperties);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedProperties();
  }, []);

  const heroSlides = useMemo(() => properties.slice(0, 4), [properties]);

  useEffect(() => {
    if (activeSlide >= heroSlides.length) {
      setActiveSlide(0);
    }
  }, [activeSlide, heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides]);

  useEffect(() => {
    if (recentPage > 1) {
      setRecentPage(1);
    }
  }, [properties, recentPage]);

  const propertyTypes = useMemo(() => {
    const types = [...new Set(properties.map((property) => property.propType).filter(Boolean))];
    return (types.length > 0 ? types : siteSettings.property.propertyTypes || []).slice(0, 5);
  }, [properties, siteSettings.property.propertyTypes]);

  const cities = useMemo(() => {
    const cityMap = properties.reduce((acc, property) => {
      if (!property.city) {
        return acc;
      }

      acc[property.city] = (acc[property.city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(cityMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [properties]);

  const featuredProperties = useMemo(
    () => properties.filter((property) => property.isFeatured),
    [properties]
  );

  const recentProperties = useMemo(() => properties.slice(0, 12), [properties]);
  const recentPerPage = 4;
  const recentPageCount = Math.max(1, Math.ceil(recentProperties.length / recentPerPage));
  const paginatedRecent = useMemo(() => {
    const start = (recentPage - 1) * recentPerPage;
    return recentProperties.slice(start, start + recentPerPage);
  }, [recentPage, recentProperties]);

  const activeProperty = heroSlides[activeSlide] || properties[0];
  const primaryAdvert = (siteSettings.content.advertisements || []).find(
    (advertisement) => advertisement?.active !== false
  );

  return (
    <div className="site-wrapper overflow-hidden position-relative">
      <section className="hero-section">
        <div className="container">
          <div className="home-dashboard-grid">
            <aside className="home-side-panel">
              <div className="home-side-card">
                <h4>Property Types</h4>
                <div className="home-side-list">
                  {propertyTypes.length > 0 ? (
                    propertyTypes.map((type) => (
                      <Link key={type} to="/property-listing">
                        <span>{type}</span>
                        <strong>
                          {
                            properties.filter((property) => property.propType === type).length
                          }
                        </strong>
                      </Link>
                    ))
                  ) : (
                    <span className="home-side-empty">No property types yet</span>
                  )}
                </div>
              </div>

              <div className="home-side-card">
                <h4>Top Cities</h4>
                <div className="home-side-list">
                  {cities.length > 0 ? (
                    cities.map(([city, count]) => (
                      <Link key={city} to="/property-listing">
                        <span>{city}</span>
                        <strong>{count}</strong>
                      </Link>
                    ))
                  ) : (
                    <span className="home-side-empty">No city data yet</span>
                  )}
                </div>
              </div>
            </aside>

            <div className="home-carousel-card">
              {activeProperty ? (
                <>
                  <div className="home-carousel-frame">
                    <img
                      src={resolveImageUrl(activeProperty.images?.image1)}
                      alt={activeProperty.name || "Property"}
                    />
                    <div className="home-carousel-overlay">
                      <span className="eyebrow-pill">Now showing</span>
                      <h1>{activeProperty.name}</h1>
                      <p>
                        {activeProperty.city || activeProperty.digitalAddress || "Prime area"} ·{" "}
                        {activeProperty.propType || "Property"} · For{" "}
                        {activeProperty.rentOrSale || "Listing"}
                      </p>
                      <div className="home-carousel-actions">
                        <Link
                          to={`/properties/${activeProperty._id}`}
                          className="btn btn-primary"
                        >
                          View Property
                        </Link>
                        <Link to="/property-listing" className="btn btn-soft-primary">
                          {siteSettings.content.hero.buttonText || "Browse Listings"}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {heroSlides.length > 1 && (
                    <div className="home-carousel-dots">
                      {heroSlides.map((property, index) => (
                        <button
                          type="button"
                          key={property._id}
                          className={index === activeSlide ? "active" : ""}
                          onClick={() => setActiveSlide(index)}
                          aria-label={`Show slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-state-card">
                  <h4>No approved listings yet.</h4>
                  <p>Add or approve properties to populate the homepage carousel.</p>
                </div>
              )}
            </div>

            <aside className="home-side-panel">
              <div className="home-side-card advert-card">
                <span className="eyebrow-pill">Advert</span>
                <h4>{primaryAdvert?.title || "List your property with faster visibility."}</h4>
                <p>
                  {primaryAdvert?.description ||
                    "Agents and admins can publish and manage stock from the dashboard."}
                </p>
                <Link to={primaryAdvert?.link || "/login"} className="btn btn-primary btn-sm">
                  {siteSettings.content.hero.buttonText || "Go to Dashboard"}
                </Link>
              </div>

              <div className="home-side-card mini-stat-card">
                <h4>Available Now</h4>
                <p>{properties.length} approved listings are ready for browsing.</p>
              </div>

              <div className="home-side-card mini-stat-card">
                <h4>Need More?</h4>
                <p>Open the full listing page to search by budget, city, and amenities.</p>
                <Link to="/property-listing" className="home-inline-link">
                  Open property listing
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-space home-list-section">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div>
              <span className="eyebrow-pill">
                {featuredProperties.length > 0 ? "Featured properties" : "Recently listed"}
              </span>
              <h2>
                {featuredProperties.length > 0
                  ? "Featured properties ready to explore"
                  : "Freshly approved properties"}
              </h2>
            </div>
            <Link to="/property-listing" className="btn btn-soft-primary">
              View all listings
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="row g-3 property-card-grid compact-home-grid">
                {(featuredProperties.length > 0 ? featuredProperties.slice(0, 4) : paginatedRecent).map(
                  (property) => (
                    <div className="col-xl-3 col-lg-4 col-md-6" key={property._id}>
                      <div className="property-card-modern compact-card h-100">
                        <div className="property-card-image-wrap">
                          <img
                            src={resolveImageUrl(property.images?.image1)}
                            className="property-card-image"
                            alt={property.name || "Property"}
                          />
                          <span className="property-chip">
                            {property.propType || "Property"}
                          </span>
                        </div>

                        <div className="property-card-body">
                          <div className="property-card-topline">
                            <span className="property-location">
                              <i className="fa fa-map-marker-alt" aria-hidden="true"></i>
                              {property.city || property.digitalAddress || "Location not specified"}
                            </span>
                          </div>

                          <h4>{property.name}</h4>
                          <div className="property-price-group property-price-group-start">
                            <strong className="property-price">
                              {formatPriceWithCurrency(property.price, property.currency, siteSettings, {
                                displayCurrency: getDisplayCurrency(siteSettings, property.country),
                              })}
                            </strong>
                            {property.currency &&
                            String(property.currency).toUpperCase() !==
                              String(getDisplayCurrency(siteSettings, property.country)).toUpperCase() ? (
                              <small className="property-price-note">
                                Original{" "}
                                {formatPriceWithCurrency(property.price, property.currency, siteSettings)}
                              </small>
                            ) : null}
                          </div>

                          <div className="property-card-facts">
                            <span>
                              <i className="fa fa-bed" aria-hidden="true"></i>
                              {property.others?.noOfBedrooms || "N/A"}
                            </span>
                            <span>
                              <i className="fa fa-bath" aria-hidden="true"></i>
                              {property.others?.bathrooms || "N/A"}
                            </span>
                            <span>
                              <i className="fa fa-home" aria-hidden="true"></i>
                              {property.squareFt || "N/A"}
                            </span>
                          </div>

                          <Link
                            to={`/properties/${property._id}`}
                            className="btn btn-primary w-100"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {featuredProperties.length === 0 && recentPageCount > 1 && (
                <div className="home-pagination">
                  {Array.from({ length: recentPageCount }).map((_, index) => (
                    <button
                      type="button"
                      key={`recent-page-${index + 1}`}
                      className={recentPage === index + 1 ? "active" : ""}
                      onClick={() => setRecentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
