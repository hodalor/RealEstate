import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdvancedFilters from './AdvancedFilters';

export default function PropertyListing({ featured = false, limit = 0, properties = [], loading = false }) {
  
  const [filter, setFilter] = useState({
    searchTerm: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    country: '',
    province: '',
    city: '',
    suburb: '',
    sortBy: 'newest',
    hasSwimmingPool: false,
    hasAirCondition: false,
    hasCarPark: false,
    showAdvancedFilters: false
  });
  
  // Extract unique location data for filters
  const [locationData, setLocationData] = useState({
    countries: [],
    provinces: [],
    cities: [],
    suburbs: []
  });

  
  
  // Extract location data from properties for filters
  useEffect(() => {
    if (properties.length > 0) {
      const countries = [...new Set(properties.map(p => p.country).filter(Boolean))].sort();
      const provinces = [...new Set(properties.map(p => p.province).filter(Boolean))].sort();
      const cities = [...new Set(properties.map(p => p.city).filter(Boolean))].sort();
      const suburbs = [...new Set(properties.map(p => p.suburb).filter(Boolean))].sort();
      
      setLocationData({
        countries,
        provinces,
        cities,
        suburbs
      });
    }
  }, []); // Only depend on properties to avoid infinite loop



  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'resetAll') {
      // Reset all filters to default values
      setFilter({
        searchTerm: '',
        propertyType: '',
        priceRange: '',
        bedrooms: '',
        country: '',
        province: '',
        city: '',
        suburb: '',
        sortBy: 'newest',
        hasSwimmingPool: false,
        hasAirCondition: false,
        hasCarPark: false,
        showAdvancedFilters: true // Keep advanced filters visible
      });
      return;
    }
    
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const filteredProperties = properties.filter(property => {
    // Filter by search term
    if (filter.searchTerm && !property.name?.toLowerCase().includes(filter.searchTerm.toLowerCase()) && 
        !property.digitalAddress?.toLowerCase().includes(filter.searchTerm.toLowerCase()) &&
        !property.propDescription?.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by property type (rent/sale)
    if (filter.propertyType && property.rentOrSale !== filter.propertyType) {
      return false;
    }
    
    // Filter by price range
    if (filter.priceRange) {
      const price = parseFloat(property.price?.replace(/[^0-9.]/g, '') || 0);
      const [min, max] = filter.priceRange.split('-').map(val => parseFloat(val.trim()));
      if (price < min || (max && price > max)) {
        return false;
      }
    }
    
    // Filter by bedrooms
    if (filter.bedrooms && property.others?.noOfBedrooms !== parseInt(filter.bedrooms)) {
      return false;
    }
    
    // Filter by country
    if (filter.country && property.country !== filter.country) {
      return false;
    }
    
    // Filter by province
    if (filter.province && property.province !== filter.province) {
      return false;
    }
    
    // Filter by city
    if (filter.city && property.city !== filter.city) {
      return false;
    }
    
    // Filter by suburb
    if (filter.suburb && property.suburb !== filter.suburb) {
      return false;
    }
    
    // Filter by amenities
    if (filter.hasSwimmingPool && !property.amenities?.swimmingPool) {
      return false;
    }
    
    if (filter.hasAirCondition && !property.amenities?.airCondition) {
      return false;
    }
    
    if (filter.hasCarPark && !property.carPark) {
      return false;
    }
    
    return true;
  });

  // Apply sorting to filtered properties
  const sortedAndFilteredProperties = React.useMemo(() => {
    let result = [...filteredProperties];
    
    // Apply sorting
    switch(filter.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'priceHighToLow':
        result.sort((a, b) => {
          const priceA = parseFloat(b.price?.replace(/[^0-9.]/g, '') || 0);
          const priceB = parseFloat(a.price?.replace(/[^0-9.]/g, '') || 0);
          return priceA - priceB;
        });
        break;
      case 'priceLowToHigh':
        result.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, '') || 0);
          const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, '') || 0);
          return priceA - priceB;
        });
        break;
      case 'bedroomsHighToLow':
        result.sort((a, b) => (b.others?.noOfBedrooms || 0) - (a.others?.noOfBedrooms || 0));
        break;
      case 'bedroomsLowToHigh':
        result.sort((a, b) => (a.others?.noOfBedrooms || 0) - (b.others?.noOfBedrooms || 0));
        break;
      default:
        // Default to newest first
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return result;
  }, [filteredProperties, filter.sortBy]);
console.log(sortedAndFilteredProperties);

  return (
    <div className="property-listing">
      {!featured && (
        <div className="filter-section mb-4">
          <div className="row g-3 mb-3">
            <div className="col-lg-6 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search by location, property name, or description"
                name="searchTerm"
                value={filter.searchTerm}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <select
                className="form-select"
                name="propertyType"
                value={filter.propertyType}
                onChange={handleFilterChange}
              >
                <option value="">Property Type</option>
                <option value="Sale">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <select
                className="form-select"
                name="sortBy"
                value={filter.sortBy}
                onChange={handleFilterChange}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="bedroomsLowToHigh">Bedrooms: Low to High</option>
                <option value="bedroomsHighToLow">Bedrooms: High to Low</option>
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <select
                className="form-select"
                name="priceRange"
                value={filter.priceRange}
                onChange={handleFilterChange}
              >
                <option value="">Price Range</option>
                <option value="0-50000">Under GHC 50,000</option>
                <option value="50000-100000">GHC 50,000 - 100,000</option>
                <option value="100000-200000">GHC 100,000 - 200,000</option>
                <option value="200000-500000">GHC 200,000 - 500,000</option>
                <option value="500000-1000000">GHC 500,000 - 1,000,000</option>
                <option value="1000000-">Above GHC 1,000,000</option>
              </select>
            </div>
          </div>
          
          <div className="row g-3">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <select
                className="form-select"
                name="country"
                value={filter.country}
                onChange={handleFilterChange}
              >
                <option value="">Country</option>
                {locationData.countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <select
                className="form-select"
                name="province"
                value={filter.province}
                onChange={handleFilterChange}
              >
                <option value="">Province/State</option>
                {locationData.provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <select
                className="form-select"
                name="city"
                value={filter.city}
                onChange={handleFilterChange}
              >
                <option value="">City</option>
                {locationData.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <select
                className="form-select"
                name="bedrooms"
                value={filter.bedrooms}
                onChange={handleFilterChange}
              >
                <option value="">Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>
          </div>
          
          <div className="d-flex justify-content-end mb-3">
            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={() => setFilter(prev => ({ ...prev, showAdvancedFilters: !prev.showAdvancedFilters }))}
            >
              {filter.showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
          </div>
          
          {filter.showAdvancedFilters && (
            <AdvancedFilters 
              filter={filter} 
              handleFilterChange={handleFilterChange} 
              locationData={locationData} 
            />
          )}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : sortedAndFilteredProperties.length > 0 ? (
        <div className="row">
          {sortedAndFilteredProperties.map((property, index) => (
            console.log(property),
            <div className="col-lg-4 col-md-6 mb-4" key={property._id}>
              <div className="card property-card h-100 shadow-sm hover-effect">
                <div className="property-image position-relative">
                  <img
                    src={property.images?.image1 || "../assets/image/property-placeholder.jpg"}
                    className="card-img-top"
                    alt={property.name}
                    style={{ height: "220px", objectFit: "cover" }}
                    
                  />
                  <div className={`property-tag position-absolute top-0 end-0 px-3 py-1 m-2 rounded ${property.rentOrSale === 'Rent' ? 'bg-info' : 'bg-success'} text-white`}>
                    For {property.rentOrSale}
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{property.name}</h5>
                  <h6 className="text-success">GHC {property.price}</h6>
                  <p className="card-text text-muted mb-2">
                    <i className="fa fa-map-marker-alt me-2"></i>
                    {property.digitalAddress || "Location not specified"}
                  </p>
                  <div className="d-flex justify-content-between border-top pt-3 mt-3">
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
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <Link to={`/properties/${property._id}`} className="btn btn-primary w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h5>No properties found</h5>
          <p>Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
}