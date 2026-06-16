import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { _fetchProperties } from "../libs/functions/fetches";
import { formatPriceWithCurrency } from "../libs/data/siteSettings";
import { resolveImageUrl } from "../libs/functions/images";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookTourModal from "./components/modals/BookTourModal";
import BookPropertyModal from "./components/modals/BookPropertyModal";
import ChatAgentModal from "./components/modals/ChatAgentModal";
import "./styles/chat-modal.css";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);

      try {
        const results = await _fetchProperties();

        if (results && results.success !== 0) {
          const foundProperty = results.data.find((item) => item._id === id);

          if (foundProperty) {
            setProperty(foundProperty);
            setActiveImage(resolveImageUrl(foundProperty.images?.image1, null));
          } else {
            setProperty(null);
            setActiveImage(null);
          }
        } else {
          setProperty(null);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const imageGallery = useMemo(() => {
    if (!property?.images) {
      return [];
    }

    return Object.entries(property.images)
      .map(([key, value]) => ({ key, value: resolveImageUrl(value, "") }))
      .filter((item) => Boolean(item.value));
  }, [property]);

  const detailItems = [
    { label: "Listing type", value: property?.rentOrSale ? `For ${property.rentOrSale}` : "N/A" },
    { label: "Bedrooms", value: property?.others?.noOfBedrooms || "N/A" },
    { label: "Bathrooms", value: property?.others?.bathrooms || "N/A" },
    { label: "Square feet", value: property?.squareFt || "N/A" },
    { label: "Parking", value: property?.others?.carPark ? "Available" : "Not included" },
    { label: "Region", value: property?.province || "Not specified" },
  ];

  const amenityItems = [
    { label: "Swimming Pool", enabled: property?.amenities?.swimmingPool },
    { label: "Air Conditioning", enabled: property?.amenities?.airCondition },
    { label: "Internet", enabled: property?.amenities?.internet },
    { label: "Pipe Water", enabled: property?.amenities?.pipeWater },
    { label: "Electricity", enabled: property?.amenities?.electricity },
    { label: "Store Room", enabled: property?.others?.storeRoom },
    { label: "Security Cameras", enabled: property?.amenities?.securityCameras },
    { label: "Security Personnel", enabled: property?.amenities?.securityPersonnel },
    { label: "Pets Allowed", enabled: property?.amenities?.petsAllowed },
    { label: "Kitchen", enabled: property?.others?.kitchen },
    { label: "Master Bedroom", enabled: property?.others?.masterBedroom },
    { label: "Dining Room", enabled: property?.others?.diningRoom },
  ];

  if (loading) {
    return (
      <div className="site-wrapper">
        <Header />
        <div className="container py-5 my-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="site-wrapper">
        <Header />
        <section className="section-space">
          <div className="container">
            <div className="empty-state-card text-center">
              <h3>Property not found</h3>
              <p>The property you selected is no longer available or could not be loaded.</p>
              <Link to="/property-listing" className="btn btn-primary mt-3">
                Back to Listings
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="site-wrapper">
      <Header />

      <section className="page-hero page-hero-light">
        <div className="container">
          <div className="page-hero-content page-hero-detail">
            <div>
              <span className="eyebrow-pill">Property overview</span>
              <h1>{property.name}</h1>
              <p>
                {property.digitalAddress || property.city || "Prime location"}{" "}
                {property.country ? `, ${property.country}` : ""}
              </p>
            </div>
            <div className="detail-price-block">
              <strong>{formatPriceWithCurrency(property.price, property.currency)}</strong>
              <span>For {property.rentOrSale || "listing"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space section-muted">
        <div className="container">
          <nav aria-label="breadcrumb" className="breadcrumb-shell">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/property-listing">Listings</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {property.name}
              </li>
            </ol>
          </nav>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="detail-panel">
                <img
                  src={activeImage || resolveImageUrl(property.images?.image1)}
                  alt={property.name}
                  className="detail-main-image"
                />

                {imageGallery.length > 0 && (
                  <div className="detail-thumbnails">
                    {imageGallery.map((image) => (
                      <button
                        type="button"
                        key={image.key}
                        className={`detail-thumbnail ${
                          activeImage === image.value ? "active" : ""
                        }`}
                        onClick={() => setActiveImage(image.value)}
                      >
                        <img src={image.value} alt={`${property.name} ${image.key}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="detail-panel">
                <div className="section-heading text-start mb-3">
                  <span className="eyebrow-pill">Description</span>
                  <h2>What makes this property stand out</h2>
                </div>
                <p className="detail-description">
                  {property.propDescription || "No description available for this property yet."}
                </p>

                <div className="detail-grid">
                  {detailItems.map((item) => (
                    <div className="detail-grid-item" key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-panel">
                <div className="section-heading text-start mb-3">
                  <span className="eyebrow-pill">Amenities</span>
                  <h2>Comfort and convenience at a glance</h2>
                </div>

                <div className="amenity-grid">
                  {amenityItems.map((item) => (
                    <div className="amenity-card" key={item.label}>
                      <span
                        className={`amenity-icon ${item.enabled ? "enabled" : "disabled"}`}
                      >
                        <i
                          className={`fa ${item.enabled ? "fa-check" : "fa-times"}`}
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="detail-side-panel sticky-top">
                <span className="eyebrow-pill">Take action</span>
                <h3>Interested in this property?</h3>
                <p>
                  Book a viewing, reserve the property, or start a conversation
                  with the agent right away.
                </p>

                <div className="d-grid gap-3">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#bookTourModal"
                  >
                    <i className="fa fa-calendar me-2" aria-hidden="true"></i>
                    Book a Tour
                  </button>
                  <button
                    className="btn btn-soft-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#bookPropertyModal"
                  >
                    <i className="fa fa-home me-2" aria-hidden="true"></i>
                    Book Property
                  </button>
                  <button
                    className="btn btn-soft-info"
                    data-bs-toggle="modal"
                    data-bs-target="#chatAgentModal"
                  >
                    <i className="fa fa-comments me-2" aria-hidden="true"></i>
                    Chat with Agent
                  </button>
                </div>

                <div className="detail-side-divider"></div>

                <div className="quick-facts">
                  <div>
                    <span>City</span>
                    <strong>{property.city || "Not specified"}</strong>
                  </div>
                  <div>
                    <span>Country</span>
                    <strong>{property.country || "Not specified"}</strong>
                  </div>
                  <div>
                    <span>Digital address</span>
                    <strong>{property.digitalAddress || "Not specified"}</strong>
                  </div>
                </div>

                <Link to="/property-listing" className="btn btn-soft-primary w-100 mt-4">
                  View More Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <BookTourModal property={property} />
      <BookPropertyModal property={property} />
      <ChatAgentModal property={property} />
    </div>
  );
}
