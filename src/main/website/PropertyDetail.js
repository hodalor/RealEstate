import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { _fetchAgents, _fetchProperties } from "../libs/functions/fetches";
import { formatPriceWithCurrency, getDisplayCurrency } from "../libs/data/siteSettings";
import { resolveImageUrl } from "../libs/functions/images";
import useSiteSettings from "../libs/hooks/useSiteSettings";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookTourModal from "./components/modals/BookTourModal";
import BookPropertyModal from "./components/modals/BookPropertyModal";
import ChatAgentModal from "./components/modals/ChatAgentModal";
import "./styles/chat-modal.css";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const { siteSettings } = useSiteSettings();

  const getPropertyImages = (images = {}) => {
    const baseImages = [
      images.image1,
      images.image2,
      images.image3,
      images.image4,
      images.image5,
      ...(Array.isArray(images.gallery) ? images.gallery : []),
    ];

    return [...new Set(baseImages.map((image) => resolveImageUrl(image, "")).filter(Boolean))];
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);

      try {
        const results = await _fetchProperties();

        if (results && results.success !== 0) {
          const foundProperty = results.data.find((item) => item._id === id);

          if (foundProperty) {
            setProperty(foundProperty);
            setActiveImage(getPropertyImages(foundProperty.images)[0] || null);
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

  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!property?.agentID) {
        setAgent(null);
        return;
      }

      const results = await _fetchAgents();

      if (results?.success === 1) {
        setAgent(results.data.find((item) => item._id === property.agentID) || null);
      } else {
        setAgent(null);
      }
    };

    fetchAgentDetails();
  }, [property?.agentID]);

  const imageGallery = useMemo(() => {
    return getPropertyImages(property?.images).map((value, index) => ({
      key: `property-image-${index}`,
      value,
    }));
  }, [property]);

  const detailItems = [
    { label: "Listing type", value: property?.rentOrSale ? `For ${property.rentOrSale}` : "N/A" },
    { label: "Bedrooms", value: property?.others?.noOfBedrooms || "N/A" },
    { label: "Bathrooms", value: property?.others?.bathrooms || "N/A" },
    { label: "Area", value: property?.squareFt || "N/A" },
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
  const localDisplayCurrency = getDisplayCurrency(siteSettings, property?.country);
  const isShortStay =
    String(property?.rentOrSale || "").trim().toLowerCase() === "short stay";
  const showOriginalPrice =
    property?.currency &&
    String(property.currency).toUpperCase() !== String(localDisplayCurrency).toUpperCase();
  const showAgentCard = !!siteSettings.content?.agentControl?.showPropertyAgentCard && !!agent;

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
              <strong>
                {formatPriceWithCurrency(property.price, property.currency, siteSettings, {
                  displayCurrency: localDisplayCurrency,
                })}
                {isShortStay ? " / night" : ""}
              </strong>
              {showOriginalPrice ? (
                <small>
                  Original {formatPriceWithCurrency(property.price, property.currency, siteSettings)}
                </small>
              ) : null}
              <span>{isShortStay ? "Per night" : `For ${property.rentOrSale || "listing"}`}</span>
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
                  {isShortStay ? (
                    <button
                      className="btn btn-soft-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#bookPropertyModal"
                    >
                      <i className="fa fa-home me-2" aria-hidden="true"></i>
                      Reserve Short Stay
                    </button>
                  ) : null}
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

                {showAgentCard ? (
                  <div className="detail-side-divider"></div>
                ) : null}

                {showAgentCard ? (
                  <div className="agent-profile-card">
                    <span className="eyebrow-pill">Listed by agent</span>
                    <div className="d-flex align-items-center mt-3">
                      <img
                        src={resolveImageUrl(agent.image, "../assets/images/user.png")}
                        alt={`${agent.firstName || ""} ${agent.lastName || ""}`.trim() || "Agent"}
                        className="rounded-circle me-3"
                        style={{ width: "64px", height: "64px", objectFit: "cover" }}
                      />
                      <div>
                        <h5 className="mb-1">
                          {[agent.firstName, agent.lastName].filter(Boolean).join(" ") || "Assigned Agent"}
                        </h5>
                        <p className="mb-0 text-muted">{agent.role || "Agent"}</p>
                      </div>
                    </div>
                    <div className="quick-facts mt-3">
                      <div>
                        <span>Phone</span>
                        <strong>{agent.phone || "Not available"}</strong>
                      </div>
                      <div>
                        <span>Email</span>
                        <strong>{agent.email || "Not available"}</strong>
                      </div>
                    </div>
                  </div>
                ) : null}

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
      <BookPropertyModal
        property={property}
        siteSettings={siteSettings}
        onBooked={(bookedDates) =>
          setProperty((current) => ({
            ...current,
            shortStay: {
              ...(current?.shortStay || {}),
              bookedDates: [
                ...new Set([...(current?.shortStay?.bookedDates || []), ...(bookedDates || [])]),
              ],
            },
          }))
        }
      />
      <ChatAgentModal property={property} />
    </div>
  );
}
