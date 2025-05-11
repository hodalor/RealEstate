import React, { useState, useContext, useEffect } from 'react';
import { BuyersContext } from '../../libs/contexts/buyersContext';

export default function FilterComp() {
  const { buyerState, filterProperties } = useContext(BuyersContext);
  const [isAdvancedFilter, setIsAdvancedFilter] = useState(false);
  const [filter, setFilter] = useState({
    area: '',
    priceRange: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    amenities: {
      wifi: false,
      airCondition: false,
      swimmingPool: false,
      pipeWater: false,
      carPark: false
    }
  });

  // Extract location and property type data for filters
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    provinces: [],
    cities: [],
    propertyTypes: ['Rent', 'Sale']
  });

  useEffect(() => {
    if (buyerState.properties.length > 0) {
      // Extract unique values for filter dropdowns
      const countries = [...new Set(buyerState.properties.map(p => p.country).filter(Boolean))].sort();
      const provinces = [...new Set(buyerState.properties.map(p => p.province).filter(Boolean))].sort();
      const cities = [...new Set(buyerState.properties.map(p => p.city).filter(Boolean))].sort();
      
      setFilterOptions({
        ...filterOptions,
        countries,
        provinces,
        cities
      });
    }
  }, [buyerState.properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFilter({
      ...filter,
      amenities: {
        ...filter.amenities,
        [name]: checked
      }
    });
  };

  const applyFilter = () => {
    // This would call a function in the context to filter properties
    if (filterProperties) {
      filterProperties(filter);
    }
  };

  const resetFilter = () => {
    setFilter({
      area: '',
      priceRange: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      amenities: {
        wifi: false,
        airCondition: false,
        swimmingPool: false,
        pipeWater: false,
        carPark: false
      }
    });
    // Reset filters in context
    if (filterProperties) {
      filterProperties({});
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Property Filters</h5>
        <button 
          className="btn btn-sm btn-outline-primary" 
          onClick={() => setIsAdvancedFilter(!isAdvancedFilter)}
        >
          {isAdvancedFilter ? 'Simple Filter' : 'Advanced Filter'}
        </button>
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-lg-8 mb-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Area, Address or Location"
                name="area"
                value={filter.area}
                onChange={handleFilterChange}
              />
              <span className="input-group-text">
                <i className="fa fa-map-marker-alt"></i>
              </span>
            </div>
          </div>
          <div className="col-lg-4 mb-2">
            <select 
              className="form-select"
              name="priceRange"
              value={filter.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Filter by Price</option>
              <option value="0-50000">Under GHC 50,000</option>
              <option value="50000-100000">GHC 50,000 - 100,000</option>
              <option value="100000-200000">GHC 100,000 - 200,000</option>
              <option value="200000-500000">GHC 200,000 - 500,000</option>
              <option value="500000+">Above GHC 500,000</option>
            </select>
          </div>
        </div>

        {isAdvancedFilter && (
          <div className="advanced-filters">
            <div className="row mb-3">
              <div className="col-md-4 mb-2">
                <select 
                  className="form-select"
                  name="propertyType"
                  value={filter.propertyType}
                  onChange={handleFilterChange}
                >
                  <option value="">Property Type</option>
                  {filterOptions.propertyTypes.map((type, index) => (
                    <option key={index} value={type}>For {type}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-2">
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
                  <option value="5+">5+ Bedrooms</option>
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <select 
                  className="form-select"
                  name="bathrooms"
                  value={filter.bathrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Bathrooms</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3 Bathrooms</option>
                  <option value="4+">4+ Bathrooms</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4 mb-2">
                <select 
                  className="form-select"
                  name="country"
                  value={filter.country}
                  onChange={handleFilterChange}
                >
                  <option value="">Country</option>
                  {filterOptions.countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <select 
                  className="form-select"
                  name="province"
                  value={filter.province}
                  onChange={handleFilterChange}
                >
                  <option value="">Province/Region</option>
                  {filterOptions.provinces.map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-2">
                <select 
                  className="form-select"
                  name="city"
                  value={filter.city}
                  onChange={handleFilterChange}
                >
                  <option value="">City</option>
                  {filterOptions.cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <h6 className="mb-2">Amenities</h6>
                <div className="d-flex flex-wrap">
                  <div className="form-check me-3 mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="wifi" 
                      name="wifi"
                      checked={filter.amenities.wifi}
                      onChange={handleAmenityChange}
                    />
                    <label className="form-check-label" htmlFor="wifi">
                      Wi-Fi
                    </label>
                  </div>
                  <div className="form-check me-3 mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="airCondition" 
                      name="airCondition"
                      checked={filter.amenities.airCondition}
                      onChange={handleAmenityChange}
                    />
                    <label className="form-check-label" htmlFor="airCondition">
                      Air Conditioning
                    </label>
                  </div>
                  <div className="form-check me-3 mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="swimmingPool" 
                      name="swimmingPool"
                      checked={filter.amenities.swimmingPool}
                      onChange={handleAmenityChange}
                    />
                    <label className="form-check-label" htmlFor="swimmingPool">
                      Swimming Pool
                    </label>
                  </div>
                  <div className="form-check me-3 mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="pipeWater" 
                      name="pipeWater"
                      checked={filter.amenities.pipeWater}
                      onChange={handleAmenityChange}
                    />
                    <label className="form-check-label" htmlFor="pipeWater">
                      Pipe Water
                    </label>
                  </div>
                  <div className="form-check me-3 mb-2">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="carPark" 
                      name="carPark"
                      checked={filter.amenities.carPark}
                      onChange={handleAmenityChange}
                    />
                    <label className="form-check-label" htmlFor="carPark">
                      Car Park
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end">
          <button 
            className="btn btn-outline-secondary me-2" 
            onClick={resetFilter}
          >
            Reset
          </button>
          <button 
            className="btn btn-primary" 
            onClick={applyFilter}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
