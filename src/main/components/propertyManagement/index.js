import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../libs/contexts/authContext';
import { AgentsContext } from '../../libs/contexts/agentsContext';
import { _sendRequest } from '../../libs/functions/creates';
import { propertyUrl, uploadUrl } from '../../libs/data/baseUrls';

export default function PropertyManagement() {
  const { authState, loading, setLoading, notiData, setNotiData } = useContext(AuthContext);
  const { agentState } = useContext(AgentsContext);
  
  // Property form state
  const [property, setProperty] = useState({
    name: '',
    price: '',
    rentOrSale: 'Sale',
    propDescription: '',
    digitalAddress: '',
    squareFt: '',
    carPark: false,
    images: {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null
    },
    amenities: {
      swimmingPool: false,
      airCondition: false,
      pipeWater: false,
      electricity: false,
      kitchen: false,
      masterBedroom: false,
      petsAllowed: false,
      storeRoom: false,
      internet: false,
      securityCameras: false,
      securityPersonnel: false
    },
    others: {
      noOfBedrooms: 1,
      bathrooms: 1,
      porch: false,
      diningRoom: false,
      livingRoom: false
    }
  });

  // Property listing state
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [view, setView] = useState('list'); // list, add, edit, detail
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    status: ''
  });

  useEffect(() => {
    if (agentState && agentState.properties) {
      setProperties(agentState.properties);
    }
  }, [agentState.properties]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setProperty({
        ...property,
        [section]: {
          ...property[section],
          [field]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setProperty({
        ...property,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        setProperty({
          ...property,
          images: {
            ...property.images,
            [name]: e.target.result
          }
        });
      };
      reader.readAsDataURL(files[0]);
      
      // Store file for upload
      setImageFiles({
        ...imageFiles,
        [name]: files[0]
      });
    }
  };

  // Upload images and return URLs
  const uploadImages = async () => {
    const imageUrls = {};
    const uploadPromises = [];

    for (const [key, file] of Object.entries(imageFiles)) {
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        
        const uploadPromise = fetch(uploadUrl + 'uploadImage', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success === 1) {
            imageUrls[key] = data.imageUrl;
          }
          return data;
        });
        
        uploadPromises.push(uploadPromise);
      }
    }

    await Promise.all(uploadPromises);
    return imageUrls;
  };

  // Submit property form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoading(true);

    try {
      // Validate form
      if (!property.name || !property.price || !property.propDescription || !property.digitalAddress) {
        setNotiData({
          type: 'warning',
          show: true,
          msg: 'Please fill all required fields'
        });
        setIsSubmitting(false);
        setLoading(false);
        return;
      }

      // Check if at least one image is selected
      if (!imageFiles.image1) {
        setNotiData({
          type: 'warning',
          show: true,
          msg: 'Please upload at least one image'
        });
        setIsSubmitting(false);
        setLoading(false);
        return;
      }

      // Upload images
      const imageUrls = await uploadImages();
      
      // Prepare property data
      const propertyData = {
        ...property,
        images: {
          ...property.images,
          ...imageUrls
        },
        agentID: authState.user._id,
        isApproved: false // Admin needs to approve
      };

      // Send property data to server
      const endpoint = selectedProperty ? 
        propertyUrl + 'updateProperty/' + selectedProperty._id : 
        propertyUrl + 'addProperty';
      
      const method = selectedProperty ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      });

      const result = await response.json();

      if (result.success === 1) {
        setNotiData({
          type: 'success',
          show: true,
          msg: selectedProperty ? 'Property updated successfully' : 'Property added successfully'
        });
        
        // Reset form and go back to list view
        resetForm();
        setView('list');
        
        // Refresh property list
        if (agentState && agentState._fetchProperties) {
          agentState._fetchProperties();
        }
      } else {
        setNotiData({
          type: 'error',
          show: true,
          msg: result.message || 'Failed to save property'
        });
      }
    } catch (error) {
      console.error('Error saving property:', error);
      setNotiData({
        type: 'error',
        show: true,
        msg: 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setProperty({
      name: '',
      price: '',
      rentOrSale: 'Sale',
      propDescription: '',
      digitalAddress: '',
      squareFt: '',
      carPark: false,
      images: {
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null
      },
      amenities: {
        swimmingPool: false,
        airCondition: false,
        pipeWater: false,
        electricity: false,
        kitchen: false,
        masterBedroom: false,
        petsAllowed: false,
        storeRoom: false,
        internet: false,
        securityCameras: false,
        securityPersonnel: false
      },
      others: {
        noOfBedrooms: 1,
        bathrooms: 1,
        porch: false,
        diningRoom: false,
        livingRoom: false
      }
    });
    setImageFiles({
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null
    });
    setSelectedProperty(null);
  };

  // Edit property
  const handleEdit = (property) => {
    setSelectedProperty(property);
    setProperty({
      name: property.name || '',
      price: property.price || '',
      rentOrSale: property.rentOrSale || 'Sale',
      propDescription: property.propDescription || '',
      digitalAddress: property.digitalAddress || '',
      squareFt: property.squareFt || '',
      carPark: property.carPark || false,
      images: property.images || {
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null
      },
      amenities: property.amenities || {
        swimmingPool: false,
        airCondition: false,
        pipeWater: false,
        electricity: false,
        kitchen: false,
        masterBedroom: false,
        petsAllowed: false,
        storeRoom: false,
        internet: false,
        securityCameras: false,
        securityPersonnel: false
      },
      others: property.others || {
        noOfBedrooms: 1,
        bathrooms: 1,
        porch: false,
        diningRoom: false,
        livingRoom: false
      }
    });
    setView('edit');
  };

  // Delete property
  const handleDelete = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(propertyUrl + 'deleteProperty/' + propertyId, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success === 1) {
        setNotiData({
          type: 'success',
          show: true,
          msg: 'Property deleted successfully'
        });
        
        // Refresh property list
        if (agentState && agentState._fetchProperties) {
          agentState._fetchProperties();
        }
      } else {
        setNotiData({
          type: 'error',
          show: true,
          msg: result.message || 'Failed to delete property'
        });
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      setNotiData({
        type: 'error',
        show: true,
        msg: 'An error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // View property details
  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setView('detail');
  };

  // Filter properties
  const filteredProperties = properties.filter(property => {
    // Search term filter
    if (searchTerm && !property.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !property.digitalAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Property type filter (rent/sale)
    if (filterOptions.propertyType && property.rentOrSale !== filterOptions.propertyType) {
      return false;
    }
    
    // Price range filter
    if (filterOptions.priceRange) {
      const price = parseFloat(property.price.replace(/[^0-9.]/g, ''));
      const [min, max] = filterOptions.priceRange.split('-').map(val => parseFloat(val.trim()));
      if (price < min || (max && price > max)) {
        return false;
      }
    }
    
    // Bedrooms filter
    if (filterOptions.bedrooms && property.others.noOfBedrooms !== parseInt(filterOptions.bedrooms)) {
      return false;
    }
    
    // Status filter (approved/pending)
    if (filterOptions.status === 'approved' && !property.isApproved) {
      return false;
    } else if (filterOptions.status === 'pending' && property.isApproved) {
      return false;
    }
    
    return true;
  });

  // Render property list view
  const renderPropertyList = () => {
    return (
      <div className="property-list-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>My Properties</h4>
          <button 
            className="btn btn-primary" 
            onClick={() => {
              resetForm();
              setView('add');
            }}
          >
            <i className="fa fa-plus mr-2"></i> Add New Property
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <select
                      className="form-control"
                      value={filterOptions.propertyType}
                      onChange={(e) => setFilterOptions({...filterOptions, propertyType: e.target.value})}
                    >
                      <option value="">All Types</option>
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <select
                      className="form-control"
                      value={filterOptions.status}
                      onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}
                    >
                      <option value="">All Status</option>
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <select
                      className="form-control"
                      value={filterOptions.priceRange}
                      onChange={(e) => setFilterOptions({...filterOptions, priceRange: e.target.value})}
                    >
                      <option value="">All Prices</option>
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
          </div>
        </div>
        
        {/* Property List */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="row">
            {filteredProperties.map((property) => (
              <div className="col-md-6 col-lg-4 mb-4" key={property._id}>
                <div className="card h-100">
                  <div className="property-image position-relative">
                    <img
                      src={property.images?.image1 || "../assets/image/property-placeholder.jpg"}
                      className="card-img-top"
                      alt={property.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className={`property-tag position-absolute top-0 end-0 px-3 py-1 m-2 rounded ${property.isApproved ? 'bg-success' : 'bg-warning'} text-white`}>
                      {property.isApproved ? 'Approved' : 'Pending'}
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{property.name}</h5>
                    <h6 className="text-success">GHC {property.price} - {property.rentOrSale}</h6>
                    <p className="card-text text-muted mb-2">
                      <i className="fa fa-map-marker-alt mr-2"></i>
                      {property.digitalAddress}
                    </p>
                    <div className="d-flex justify-content-between border-top pt-3 mt-3">
                      <span title="Bedrooms">
                        <i className="fa fa-bed mr-1"></i>
                        {property.others?.noOfBedrooms || "N/A"}
                      </span>
                      <span title="Bathrooms">
                        <i className="fa fa-shower mr-1"></i>
                        {property.others?.bathrooms || "N/A"}
                      </span>
                      <span title="Square Feet">
                        <i className="fa fa-home mr-1"></i>
                        {property.squareFt || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleViewDetails(property)}
                    >
                      <i className="fa fa-eye mr-1"></i> View
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleEdit(property)}
                    >
                      <i className="fa fa-edit mr-1"></i> Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(property._id)}
                    >
                      <i className="fa fa-trash mr-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h5>No properties found</h5>
            <p>Add your first property or adjust your search filters</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => {
                resetForm();
                setView('add');
              }}
            >
              <i className="fa fa-plus mr-2"></i> Add New Property
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render property form (add/edit)
  const renderPropertyForm = () => {
    return (
      <div className="property-form-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>{selectedProperty ? 'Edit Property' : 'Add New Property'}</h4>
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => {
              resetForm();
              setView('list');
            }}
          >
            <i className="fa fa-arrow-left mr-2"></i> Back to List
          </button>
        </div>
        
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Basic Information */}
                <div className="col-md-6">
                  <h5 className="mb-3">Basic Information</h5>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="name">Property Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={property.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="price">Price (GHC) *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={property.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="rentOrSale">Property For</label>
                    <select
                      className="form-control"
                      id="rentOrSale"
                      name="rentOrSale"
                      value={property.rentOrSale}
                      onChange={handleInputChange}
                    >
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="digitalAddress">Location/Address *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="digitalAddress"
                      name="digitalAddress"
                      value={property.digitalAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="squareFt">Square Feet</label>
                    <input
                      type="text"
                      className="form-control"
                      id="squareFt"
                      name="squareFt"
                      value={property.squareFt}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="propDescription">Description *</label>
                    <textarea
                      className="form-control"
                      id="propDescription"
                      name="propDescription"
                      rows="4"
                      value={property.propDescription}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="col-md-6">
                  <h5 className="mb-3">Property Details</h5>
                  
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="others.noOfBedrooms">Bedrooms</label>
                      <select
                        className="form-control"
                        id="others.noOfBedrooms"
                        name="others.noOfBedrooms"
                        value={property.others.noOfBedrooms}
                        onChange={handleInputChange}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="others.bathrooms">Bathrooms</label>
                      <select
                        className="form-control"
                        id="others.bathrooms"
                        name="others.bathrooms"
                        value={property.others.bathrooms}
                        onChange={handleInputChange}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="carPark"
                        name="carPark"
                        checked={property.carPark}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="carPark">Car Park</label>
                    </div>
                  </div>
                  
                  <div className="form-group mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="others.porch"
                        name="others.porch"
                        checked={property.others.porch}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="others.porch">Porch/Balcony</label>
                    </div>
                  </div>
                  
                  <div className="form-group mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="others.diningRoom"
                        name="others.diningRoom"
                        checked={property.others.diningRoom}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="others.diningRoom">Dining Room</label>
                    </div>
                  </div>
                  
                  <div className="form-group mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="others.livingRoom"
                        name="others.livingRoom"
                        checked={property.others.livingRoom}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="others.livingRoom">Living Room</label>
                    </div>
                  </div>
                </div>
                
                {/* Amenities */}
                <div className="col-12 mt-4">
                  <h5 className="mb-3">Amenities</h5>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="amenities.swimmingPool"
                          name="amenities.swimmingPool"
                          checked={property.amenities.swimmingPool}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="amenities.swimmingPool">Swimming Pool</label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="amenities.airCondition"
                          name="amenities.airCondition"
                          checked={property.amenities.airCondition}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="amenities.airCondition">Air Conditioning</label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="amenities.pipeWater"
                          name="amenities.pipeWater"
                          checked={property.amenities.pipeWater}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="amenities.pipeWater">Pipe Water</label>
                      </div>
                      <div className="form-check mb-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="amenities.electricity"
                          name="amenities.electricity"
                          checked={property.amenities.electricity}
                          onChange={handleInputChange}
                        />