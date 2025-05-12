import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { _fetchProperties } from '../libs/functions/fetches';
import Header from './components/Header';
import Footer from './components/Footer';
import BookTourModal from './components/modals/BookTourModal';
import BookPropertyModal from './components/modals/BookPropertyModal';
import ChatAgentModal from './components/modals/ChatAgentModal';
import './styles/chat-modal.css';

// This would typically come from your auth context
const isAdmin = false; // Set to true to test admin functionality

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const results = await _fetchProperties();
      if (results && results.success !== 0) {
        const foundProperty = results.data.find(prop => prop._id === id);
        if (foundProperty) {
          setProperty(foundProperty);
          setActiveImage(foundProperty.images?.image1);
        }
      }
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
    setLoading(false);
  };

  const handleImageClick = (imageUrl) => {
    setActiveImage(imageUrl);
  };

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
        <div className="container py-5 my-5 text-center">
          <h3>Property not found</h3>
          <p>The property you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="site-wrapper">
      <Header />
      
      <div className="property-detail-section py-5">
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-4 d-flex justify-content-between align-items-center">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/properties">Properties</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{property.name}</li>
            </ol>
            {isAdmin && (
              <Link to={`/admin/properties/edit/${property._id}`} className="btn btn-sm btn-primary">
                <i className="fa fa-edit me-1"></i> Edit Property
              </Link>
            )}
          </nav>

          <div className="row">
            <div className="col-lg-8">
              {/* Main Property Image */}
              <div className="main-image mb-4">
                <img 
                  src={activeImage || property.images?.image1 || "/assets/image/property-placeholder.jpg"} 
                  alt={property.name} 
                  className="img-fluid rounded shadow"
                  style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                  
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="thumbnail-images d-flex mb-4 overflow-auto">
                {property.images && Object.entries(property.images).map(([key, url]) => {
                  if (url) {
                    return (
                      <div 
                        key={key} 
                        className={`thumbnail me-2 ${activeImage === url ? 'border border-primary' : ''}`}
                        onClick={() => handleImageClick(url)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img 
                          src={url} 
                          alt={`${property.name} - ${key}`} 
                          className="img-fluid rounded"
                          style={{ width: '100px', height: '75px', objectFit: 'cover' }}
                         
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Property Details */}
              <div className="card mb-4">
                <div className="card-body">
                  <h2 className="card-title">{property.name}</h2>
                  <h4 className="text-success mb-3">GHC {property.price} - For {property.rentOrSale}</h4>
                  <p className="text-muted mb-4">
                    <i className="fa fa-map-marker-alt me-2"></i>
                    {property.digitalAddress || "Location not specified"}
                  </p>
                  
                  <h5 className="mb-3">Description</h5>
                  <p className="mb-4">{property.propDescription}</p>
                  
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5 className="mb-3">Property Details</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Property Type</span>
                          <span className="badge bg-primary rounded-pill">For {property.rentOrSale}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Bedrooms</span>
                          <span>{property.others?.noOfBedrooms || "N/A"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Bathrooms</span>
                          <span>{property.others?.bathrooms || "N/A"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Square Feet</span>
                          <span>{property.squareFt || "N/A"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Car Parking</span>
                          <span>{property.carPark ? "Yes" : "No"}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h5 className="mb-3">Room Features</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Living Room</span>
                          <span>{property.others?.livingRoom ? "Yes" : "No"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Dining Room</span>
                          <span>{property.others?.diningRoom ? "Yes" : "No"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Master Bedroom</span>
                          <span>{property.amenities?.masterBedroom ? "Yes" : "No"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Kitchen</span>
                          <span>{property.amenities?.kitchen ? "Yes" : "No"}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Porch/Balcony</span>
                          <span>{property.others?.porch ? "Yes" : "No"}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Amenities</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.swimmingPool ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Swimming Pool
                        </li>
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.airCondition ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Air Conditioning
                        </li>
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.internet ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Internet
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.pipeWater ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Pipe Water
                        </li>
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.electricity ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Electricity
                        </li>
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.storeRoom ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Store Room
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.securityCameras ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Security Cameras
                        </li>
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.securityPersonnel ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Security Personnel
                        </li>
                        <li className="mb-2">
                          <i className={`fa ${property.amenities?.petsAllowed ? 'fa-check text-success' : 'fa-times text-danger'} me-2`}></i>
                          Pets Allowed
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              {/* Property Actions */}
              <div className="card mb-4 sticky-top" style={{ top: '100px' }}>
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Property Actions</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-3">
                    <button className="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#bookTourModal">
                      <i className="fa fa-calendar me-2"></i> Book a Tour
                    </button>
                    <button className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#bookPropertyModal">
                      <i className="fa fa-home me-2"></i> Book Property
                    </button>
                    <button className="btn btn-info w-100" data-bs-toggle="modal" data-bs-target="#chatAgentModal">
                      <i className="fa fa-comments me-2"></i> Chat with Agent
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Contact Agent Form */}
              <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Contact Agent</h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea className="form-control" id="message" rows="4" placeholder="I'm interested in this property..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Send Message</button>
                  </form>
                </div>
              </div>

              {/* Similar Properties */}
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">You May Also Like</h5>
                </div>
                <div className="card-body">
                  <p className="text-center">Check out similar properties</p>
                  <Link to="/properties" className="btn btn-outline-primary w-100">View All Properties</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Modals */}
      <BookTourModal property={property} />
      <BookPropertyModal property={property} />
      <ChatAgentModal property={property} />
    </div>
  );
}