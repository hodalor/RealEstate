import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { resolveImageUrl } from "../../libs/functions/images";
import {
  convertPrice,
  detectVisitorCountry,
  findLocationHierarchyByCity,
  formatPriceWithCurrency,
  getBudgetOptions,
  getCityOptions,
  getDisplayCurrency,
  getEnabledCountries,
} from "../../libs/data/siteSettings";
import useSiteSettings from "../../libs/hooks/useSiteSettings";

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

const normalizeValue = (value) => String(value || "").trim().toLowerCase();

export default function PropertyListing({
  featured = false,
  limit = 0,
  properties = [],
  loading = false,
}) {
  const [filter, setFilter] = useState(defaultFilter);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { siteSettings } = useSiteSettings();
  const enabledCountries = useMemo(() => getEnabledCountries(siteSettings), [siteSettings]);
  const visitorCountry = detectVisitorCountry(siteSettings);
  const selectedCountryConfig = useMemo(
    () =>
      filter.country
        ? enabledCountries.find(
            (country) => normalizeValue(country.name) === normalizeValue(filter.country)
          ) || null
        : null,
    [enabledCountries, filter.country]
  );
  const selectedCountryProperties = useMemo(
    () =>
      filter.country
        ? properties.filter(
            (property) => normalizeValue(property.country) === normalizeValue(filter.country)
          )
        : [],
    [filter.country, properties]
  );
  const inferredCountryCurrency = useMemo(() => {
    if (!filter.country) {
      return "";
    }

    const currencies = selectedCountryProperties
      .map((property) => String(property.currency || "").trim().toUpperCase())
      .filter(Boolean);

    return currencies[0] || "";
  }, [filter.country, selectedCountryProperties]);
  const budgetCurrency =
    selectedCountryConfig?.defaultCurrency ||
    inferredCountryCurrency ||
    getDisplayCurrency(siteSettings, filter.country || visitorCountry);
  const selectedProvinceOptions = useMemo(
    () => selectedCountryConfig?.provinces || [],
    [selectedCountryConfig]
  );
  const selectedCityOptions = useMemo(
    () => (filter.country ? getCityOptions(siteSettings, filter.country, filter.province) : []),
    [filter.country, filter.province, siteSettings]
  );
  const budgetOptions = useMemo(
    () => getBudgetOptions(siteSettings, filter.country || visitorCountry),
    [filter.country, siteSettings, visitorCountry]
  );

  useEffect(() => {
    if (!isMobileFiltersOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileFiltersOpen]);

  const locationData = useMemo(
    () => {
      const configuredCountries = enabledCountries.map((country) => country.name);
      const propertyCountries = properties.map((property) => property.country).filter(Boolean);
      const propertyProvinces = selectedCountryProperties
        .map((property) => property.province || property.region)
        .filter(Boolean);
      const propertyCities = selectedCountryProperties
        .filter(
          (property) =>
            !filter.province ||
            normalizeValue(property.province || property.region) === normalizeValue(filter.province)
        )
        .map((property) => property.city)
        .filter(Boolean);

      return {
        countries: [...new Set([...configuredCountries, ...propertyCountries])].sort(),
        provinces: [
          ...new Set([
            ...selectedProvinceOptions.map((province) => province.name),
            ...propertyProvinces,
          ]),
        ].sort(),
        cities: [
          ...new Set([...selectedCityOptions.map((city) => city.name), ...propertyCities]),
        ].sort(),
      };
    },
    [enabledCountries, filter.province, properties, selectedCityOptions, selectedCountryProperties, selectedProvinceOptions]
  );

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilter((current) => {
      const nextValue = type === "checkbox" ? checked : value;

      if (name === "country") {
        return {
          ...current,
          country: nextValue,
          province: "",
          city: "",
          priceRange: "",
        };
      }

      if (name === "province") {
        return {
          ...current,
          province: nextValue,
          city: "",
        };
      }

      if (name === "city") {
        if (!nextValue) {
          return {
            ...current,
            city: "",
          };
        }

        const hierarchy = findLocationHierarchyByCity(siteSettings, nextValue, current.country);
        return {
          ...current,
          country: current.country || hierarchy?.countryName || current.country,
          province: hierarchy?.provinceName || current.province,
          city: nextValue,
        };
      }

      return {
        ...current,
        [name]: nextValue,
      };
    });
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
          property.province,
          property.city,
          property.suburb,
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

        const price = convertPrice(
          property.price,
          property.currency || budgetCurrency,
          budgetCurrency,
          siteSettings
        );

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

      if (filter.country && normalizeValue(property.country) !== normalizeValue(filter.country)) {
        return false;
      }

      if (
        filter.country &&
        selectedCountryConfig &&
        normalizeValue(property.country) !== normalizeValue(selectedCountryConfig.name)
      ) {
        return false;
      }

      if (filter.province && normalizeValue(property.province) !== normalizeValue(filter.province)) {
        return false;
      }

      if (filter.city && normalizeValue(property.city) !== normalizeValue(filter.city)) {
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
        result.sort(
          (a, b) =>
            convertPrice(a.price, a.currency || budgetCurrency, budgetCurrency, siteSettings) -
            convertPrice(b.price, b.currency || budgetCurrency, budgetCurrency, siteSettings)
        );
        break;
      case "priceHighToLow":
        result.sort(
          (a, b) =>
            convertPrice(b.price, b.currency || budgetCurrency, budgetCurrency, siteSettings) -
            convertPrice(a.price, a.currency || budgetCurrency, budgetCurrency, siteSettings)
        );
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
  }, [budgetCurrency, featured, filter, limit, properties, selectedCountryConfig, siteSettings]);

  const visibleProperties = filteredProperties;
  const filterContent = (
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
            <option value="Short Stay">Short Stay</option>
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
            <option value="">Budget ({budgetCurrency})</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
            <option value="">Province / Region</option>
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
  );

  return (
    <div className="property-listing">
      {!featured && (
        <>
          <div className="mobile-filter-launcher mb-3">
            <button
              type="button"
              className="btn btn-primary mobile-filter-open-btn"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <i className="fa fa-search" aria-hidden="true"></i>
              <span>Search Filters</span>
            </button>
            <button
              type="button"
              className="btn btn-soft-primary mobile-filter-reset-btn"
              onClick={() => setFilter(defaultFilter)}
            >
              Reset
            </button>
          </div>

          <div
            className={`mobile-filter-backdrop ${isMobileFiltersOpen ? "is-visible" : ""}`}
            onClick={() => setIsMobileFiltersOpen(false)}
          />
        <div className={`filter-shell mb-4 ${isMobileFiltersOpen ? "mobile-open" : ""}`}>
          <div className="filter-shell-header">
            <div>
              <h3>Filter properties faster</h3>
              <p className="filter-currency-note">
                Budget compares all prices in {budgetCurrency}
              </p>
            </div>
            <div className="filter-shell-actions">
              <button
                type="button"
                className="btn btn-soft-primary"
                onClick={() => setFilter(defaultFilter)}
              >
                Reset Filters
              </button>
              <button
                type="button"
                className="btn btn-primary mobile-filter-close-btn"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
          {filterContent}
        </div>
        </>
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
                    {String(property.rentOrSale || "").toLowerCase() === "short stay"
                      ? "Short Stay"
                      : `For ${property.rentOrSale || "Listing"}`}
                  </span>
                </div>

                <div className="property-card-body">
                  <div className="property-card-topline">
                    <span className="property-location">
                      <i className="fa fa-map-marker-alt" aria-hidden="true"></i>
                      {property.city || property.digitalAddress || "Location not specified"}
                    </span>
                    <div className="property-price-group">
                      {(() => {
                        const localCurrency = getDisplayCurrency(
                          siteSettings,
                          filter.country || property.country || visitorCountry
                        );
                        const showOriginalPrice =
                          property.currency &&
                          String(property.currency).toUpperCase() !== String(localCurrency).toUpperCase();

                        return (
                          <>
                            <strong className="property-price">
                              {formatPriceWithCurrency(property.price, property.currency, siteSettings, {
                                displayCurrency: localCurrency,
                              })}
                              {String(property.rentOrSale || "").toLowerCase() === "short stay"
                                ? " / night"
                                : ""}
                            </strong>
                            {showOriginalPrice ? (
                              <small className="property-price-note">
                                Original{" "}
                                {formatPriceWithCurrency(property.price, property.currency, siteSettings)}
                              </small>
                            ) : null}
                          </>
                        );
                      })()}
                    </div>
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
                      {property.squareFt || "N/A"}
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
