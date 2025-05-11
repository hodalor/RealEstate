import React from 'react';

export default function AdvancedFilters({ filter, handleFilterChange, locationData }) {
  return (
    <div className="advanced-filters bg-light p-3 rounded mb-4">
      <h5 className="mb-3">Advanced Filters</h5>
      <div className="row g-3">
        {/* Location Filters */}
        <div className="col-md-3 col-sm-6">
          <label htmlFor="country" className="form-label small">Country</label>
          <select
            className="form-select form-select-sm"
            id="country"
            name="country"
            value={filter.country}
            onChange={handleFilterChange}
          >
            <option value="">All Countries</option>
            {locationData.countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <label htmlFor="province" className="form-label small">Province/State</label>
          <select
            className="form-select form-select-sm"
            id="province"
            name="province"
            value={filter.province}
            onChange={handleFilterChange}
          >
            <option value="">All Provinces</option>
            {locationData.provinces.map((province, index) => (
              <option key={index} value={province}>{province}</option>
            ))}
          </select>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <label htmlFor="city" className="form-label small">City</label>
          <select
            className="form-select form-select-sm"
            id="city"
            name="city"
            value={filter.city}
            onChange={handleFilterChange}
          >
            <option value="">All Cities</option>
            {locationData.cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <div className="col-md-3 col-sm-6">
          <label htmlFor="suburb" className="form-label small">Suburb/Area</label>
          <select
            className="form-select form-select-sm"
            id="suburb"
            name="suburb"
            value={filter.suburb}
            onChange={handleFilterChange}
          >
            <option value="">All Suburbs</option>
            {locationData.suburbs.map((suburb, index) => (
              <option key={index} value={suburb}>{suburb}</option>
            ))}
          </select>
        </div>
        
        {/* Property Filters */}
        <div className="col-md-4 col-sm-6">
          <label htmlFor="priceRange" className="form-label small">Price Range</label>
          <select
            className="form-select form-select-sm"
            id="priceRange"
            name="priceRange"
            value={filter.priceRange}
            onChange={handleFilterChange}
          >
            <option value="">Any Price</option>
            <option value="0-50000">Under GHC 50,000</option>
            <option value="50000-100000">GHC 50,000 - 100,000</option>
            <option value="100000-200000">GHC 100,000 - 200,000</option>
            <option value="200000-500000">GHC 200,000 - 500,000</option>
            <option value="500000-1000000">GHC 500,000 - 1,000,000</option>
            <option value="1000000-">Above GHC 1,000,000</option>
          </select>
        </div>
        
        <div className="col-md-4 col-sm-6">
          <label htmlFor="bedrooms" className="form-label small">Bedrooms</label>
          <select
            className="form-select form-select-sm"
            id="bedrooms"
            name="bedrooms"
            value={filter.bedrooms}
            onChange={handleFilterChange}
          >
            <option value="">Any</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>
        
        <div className="col-md-4 col-sm-6">
          <label htmlFor="sortBy" className="form-label small">Sort By</label>
          <select
            className="form-select form-select-sm"
            id="sortBy"
            name="sortBy"
            value={filter.sortBy}
            onChange={handleFilterChange}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priceHighToLow">Price (High to Low)</option>
            <option value="priceLowToHigh">Price (Low to High)</option>
            <option value="bedroomsHighToLow">Bedrooms (Most to Least)</option>
            <option value="bedroomsLowToHigh">Bedrooms (Least to Most)</option>
          </select>
        </div>
        
        {/* Additional Filters */}
        <div className="col-12">
          <div className="d-flex flex-wrap gap-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="hasSwimmingPool"
                name="hasSwimmingPool"
                checked={filter.hasSwimmingPool || false}
                onChange={(e) => handleFilterChange({
                  target: {
                    name: e.target.name,
                    value: e.target.checked
                  }
                })}
              />
              <label className="form-check-label small" htmlFor="hasSwimmingPool">
                Swimming Pool
              </label>
            </div>
            
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="hasAirCondition"
                name="hasAirCondition"
                checked={filter.hasAirCondition || false}
                onChange={(e) => handleFilterChange({
                  target: {
                    name: e.target.name,
                    value: e.target.checked
                  }
                })}
              />
              <label className="form-check-label small" htmlFor="hasAirCondition">
                Air Conditioning
              </label>
            </div>
            
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="hasCarPark"
                name="hasCarPark"
                checked={filter.hasCarPark || false}
                onChange={(e) => handleFilterChange({
                  target: {
                    name: e.target.name,
                    value: e.target.checked
                  }
                })}
              />
              <label className="form-check-label small" htmlFor="hasCarPark">
                Car Parking
              </label>
            </div>
          </div>
        </div>
        
        {/* Reset Filters Button */}
        <div className="col-12 mt-3">
          <button 
            className="btn btn-sm btn-outline-secondary" 
            onClick={() => {
              // Create an event with empty values for all filter fields
              const resetEvent = {
                target: {
                  name: 'resetAll',
                  value: true
                }
              };
              handleFilterChange(resetEvent);
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}