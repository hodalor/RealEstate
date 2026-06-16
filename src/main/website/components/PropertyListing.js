import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { resolveImageUrl } from "../../libs/functions/images";
import { formatPriceWithCurrency } from "../../libs/data/siteSettings";

const defaultFilter = {
  searchTerm: "",
  propertyType: "",
  priceRange: "",
  bedrooms: "",
  country: "",
  province: "",
  city: "",
  sortBy: "newest",
  hasSwimmingPool: false,
  hasAirCondition: false,
  hasCarPark: false,
};

const getPriceValue = (price) =>
  parseFloat(String(price || "0").replace(/[^0-9.]/g, "")) || 0;

export default function PropertyListing({
  featured = false,
  limit = 0,
  properties = [],
  loading = false,
}) {
  const [filter, setFilter] = useState(defaultFilter);

  const locationData = useMemo(
    () => ({
      countries: [...new Set(properties.map((item) => item.country).filter(Boolean))].sort(),
      provinces: [...new Set(properties.map((item) => item.province).filter(Boolean))].sort(),
      cities: [...new Set(properties.map((item) => item.city).filter(Boolean))].sort(),
    }),
    [properties]
  );

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilter((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredProperties = useMemo(() => {
    const searchTerm = filter.searchTerm.trim().toLowerCase();

    let result = properties.filter((property) => {
      if (
        searchTerm &&
        ![
          property.name,
          property.digitalAddress,
          property.propDescription,
          property.city,
          property.country,
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(searchTerm))
      ) {
        return false;
      }

      if (filter.propertyType && property.rentOrSale !== filter.propertyType) {
        return false;
      }

      if (filter.priceRange) {
        const [minValue, maxValue] = filter.priceRange.split("-").map((value) => {
          if (!value) {
            return null;
          }

          return parseFloat(value);
        });

        const price = getPriceValue(property.price);

        if (minValue !== null && price < minValue) {
          return false;
        }

        if (maxValue !== null && price > maxValue) {
          return false;
        }
      }

      if (filter.bedrooms && Number(property.others?.noOfBedrooms || 0) < Number(filter.bedrooms)) {
        return false;
      }

      if (filter.country && property.country !== filter.country) {
        return false;
      }

      if (filter.province && property.province !== filter.province) {
        return false;
      }

      if (filter.city && property.city !== filter.city) {
        return false;
      }

      if (filter.hasSwimmingPool && !property.amenities?.swimmingPool) {
        return false;
      }

      if (filter.hasAirCondition && !property.amenities?.airCondition) {
        return false;
      }

      if (filter.hasCarPark && !(property.carPark || property.others?.carPark)) {
        return false;
      }

      return true;
    });

    switch (filter.sortBy) {
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "priceLowToHigh":
        result.sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));
        break;
      case "priceHighToLow":
        result.sort((a, b) => getPriceValue(b.price) - getPriceValue(a.price));
        break;
      case "bedroomsHighToLow":
        result.sort((a, b) => (b.others?.noOfBedrooms || 0) - (a.others?.noOfBedrooms || 0));
        break;
      case "bedroomsLowToHigh":
        result.sort((a, b) => (a.others?.noOfBedrooms || 0) - (b.others?.noOfBedrooms || 0));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return featured && limit > 0 ? result.slice(0, limit) : result;
  }, [featured, filter, limit, properties]);

  const visibleProperties = filteredProperties;

  return (
    <div className="property-listing">
      {!featured && (
        <div className="filter-shell mb-4">
          <div className="filter-shell-header">
            <div>
              <h3>Filter properties faster</h3>
            </div>

            <button
              type="button"
              className="btn btn-soft-primary"
              onClick={() => setFilter(defaultFilter)}
            >
              Reset Filters
            </button>
          </div>

          <div className="row g-3">
            <div className="col-lg-4">
              <input
                type="text"
                className="website-field"
                placeholder="Search by name, city, address, or description"
                name="searchTerm"
                value={filter.searchTerm}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="website-select-wrap">
                <select
                  className="website-field website-select"
                  name="propertyType"
                  value={filter.propertyType}
                  onChange={handleFilterChange}
                >
                  <option value="">Type</option>
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Rent</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="website-select-wrap">
                <select
                  className="website-field website-select"
                  name="priceRange"
                  value={filter.priceRange}
                  onChange={handleFilterChange}
                >
                  <option value="">Budget</option>
                  <option value="0-50000">Under 50,000</option>
                  <option value="50000-100000">50,000 - 100,000</option>
                  <option value="100000-250000">100,000 - 250,000</option>
                  <option value="250000-500000">250,000 - 500,000</option>
                  <option value="500000-1000000">500,000 - 1,000,000</option>
                  <option value="1000000-">Above 1,000,000</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="website-select-wrap">
                <select
                  className="website-field website-select"
                  name="bedrooms"
                  value={filter.bedrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="website-select-wrap">
                <select
                  className="website-field website-select"
                  name="sortBy"
                  value={filter.sortBy}
                  onChange={handleFilterChange}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="priceLowToHigh">Price Low to High</option>
                  <option value="priceHighToLow">Price High to Low</option>
                  <option value="bedroomsLowToHigh">Bedrooms Low to High</option>
                  <option value="bedroomsHighToLow">Bedrooms High to Low</option>
                </select>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="website-select-wrap">
                <select
                  className="website-field website-select"
                  name="country"
                  value={filter.country}
                  onChange={handleFilterChange}
                >
                  <option value="">Country</option>
                  {locationData.countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="website-select-wrap">
                <select
                  className="website-field website-select"
                  name="province"
                  value={filter.province}
                  onChange={handleFilterChange}
                >
                  <option value="">Province</option>
                  {locationData.provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="website-select-wrap">
                <select
                  className="website-field website-select"
                  name="city"
                  value={filter.city}
                  onChange={handleFilterChange}
                >
                  <option value="">City</option>
                  {locationData.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="amenity-toggles">
                <label className="toggle-chip">
                  <input
                    type="checkbox"
                    name="hasSwimmingPool"
                    checked={filter.hasSwimmingPool}
                    onChange={handleFilterChange}
                  />
                  <span>Swimming pool</span>
                </label>
                <label className="toggle-chip">
                  <input
                    type="checkbox"
                    name="hasAirCondition"
                    checked={filter.hasAirCondition}
                    onChange={handleFilterChange}
                  />
                  <span>Air conditioning</span>
                </label>
                <label className="toggle-chip">
                  <input
                    type="checkbox"
                    name="hasCarPark"
                    checked={filter.hasCarPark}
                    onChange={handleFilterChange}
                  />
                  <span>Parking</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {!featured && !loading && (
        <div className="listing-meta">
          <span>{visibleProperties.length} properties available</span>
          <span>Approved public listings only</span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : visibleProperties.length > 0 ? (
        <div className="row g-3 property-card-grid">
          {visibleProperties.map((property) => (
            <div className="col-lg-4 col-md-6" key={property._id}>
              <div className="property-card-modern h-100">
                <div className="property-card-image-wrap">
                  <img
                    src={resolveImageUrl(property.images?.image1)}
                    className="property-card-image"
                    alt={property.name || "Property"}
                  />
                  <span className="property-chip">
                    For {property.rentOrSale || "Listing"}
                  </span>
                </div>

                <div className="property-card-body">
                  <div className="property-card-topline">
                    <span className="property-location">
                      <i className="fa fa-map-marker-alt" aria-hidden="true"></i>
                      {property.city || property.digitalAddress || "Location not specified"}
                    </span>
                    <strong className="property-price">
                      {formatPriceWithCurrency(property.price, property.currency)}
                    </strong>
                  </div>

                  <h4>{property.name || "Unnamed property"}</h4>

                  <div className="property-card-facts">
                    <span>
                      <i className="fa fa-bed" aria-hidden="true"></i>
                      {property.others?.noOfBedrooms || "N/A"} beds
                    </span>
                    <span>
                      <i className="fa fa-bath" aria-hidden="true"></i>
                      {property.others?.bathrooms || "N/A"} baths
                    </span>
                    <span>
                      <i className="fa fa-home" aria-hidden="true"></i>
                      {property.squareFt || "N/A"} sqft
                    </span>
                  </div>

                  <Link to={`/properties/${property._id}`} className="btn btn-primary w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-card">
            <h4>No properties match your filters.</h4>
            <p>Try changing the city, budget, or amenity options to widen the search.</p>
            {!featured && (
              <button
                type="button"
                className="btn btn-soft-primary"
                onClick={() => setFilter(defaultFilter)}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
