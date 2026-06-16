import React, { useContext, useState, useEffect, useRef } from "react";
import { AdminContext } from "../../../../libs/contexts/adminContext";
import { AuthContext } from "../../../../libs/contexts/authContext";
import Loader from "../../../../components/loader";
import WebsiteSettings from "./WebsiteSettings";
import DeveloperSettings from "./DeveloperSettings";
import DashboardModal from "../../../../components/admin/DashboardModal";
import { toast } from "react-toastify";
import { normalizeSiteSettings } from "../../../../libs/data/siteSettings";

export default function Settings() {
  const { adminData, _saveSettings, _fetchSettings } = useContext(AdminContext);
  const { loading } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('general');
  const [locationTab, setLocationTab] = useState("countries");
  const [showContentManagement, setShowContentManagement] = useState(false);
  const [showDeveloperSettings, setShowDeveloperSettings] = useState(false);
  const [locationModal, setLocationModal] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  
  // Local state for settings
  const [settings, setSettings] = useState(normalizeSiteSettings());

  // New country and province state
  const [newCountry, setNewCountry] = useState({
    name: "",
    isoCode: "",
    phoneCode: "",
    defaultCurrency: "",
    currencySymbol: "",
    allowedCurrenciesText: "",
  });
  const [newProvince, setNewProvince] = useState({ name: "", countryId: "" });
  const [newCity, setNewCity] = useState({
    name: "",
    countryId: "",
    provinceId: "",
    suburbsText: "",
  });
  const [newSuburb, setNewSuburb] = useState({
    name: "",
    countryId: "",
    provinceId: "",
    cityId: "",
  });
  const [newPropertyType, setNewPropertyType] = useState("");
  const [newAmenity, setNewAmenity] = useState("");
  const fetchSettingsRef = useRef(_fetchSettings);

  const updateSettings = (updater) => {
    setSettings((prev) => (typeof updater === "function" ? updater(prev) : updater));
    setIsDirty(true);
  };

  useEffect(() => {
    fetchSettingsRef.current();
  }, []);

  useEffect(() => {
    if (adminData.settings && (!hasHydrated || !isDirty)) {
      setSettings(normalizeSiteSettings(adminData.settings));
      setHasHydrated(true);
    }
  }, [adminData.settings, hasHydrated, isDirty]);

  const handleTabChange = (tab) => {
    if (tab === 'content') {
      setShowContentManagement(true);
      setShowDeveloperSettings(false);
      setActiveTab('');
    } else if (tab === 'developer') {
      setShowDeveloperSettings(true);
      setShowContentManagement(false);
      setActiveTab('');
    } else {
      setShowContentManagement(false);
      setShowDeveloperSettings(false);
      setActiveTab(tab);
    }
  };

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    updateSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [name]: value,
      },
    }));
  };

  const addCountry = () => {
    if (!newCountry.name.trim() || !newCountry.isoCode.trim() || !newCountry.phoneCode.trim()) return false;

    const countryId = newCountry.name.toLowerCase().replace(/\s+/g, "-");
    const allowedCurrencies = Array.from(
      new Set(
        newCountry.allowedCurrenciesText
          .split(",")
          .map((item) => item.trim().toUpperCase())
          .filter(Boolean)
          .concat(newCountry.defaultCurrency.trim().toUpperCase())
          .concat(settings.general.defaultCurrency)
      )
    );

    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: [
          ...prev.location.countries,
          {
            id: countryId,
            name: newCountry.name.trim(),
            enabled: true,
            isoCode: newCountry.isoCode.trim().toUpperCase(),
            phoneCode: newCountry.phoneCode.trim(),
            defaultCurrency: newCountry.defaultCurrency.trim().toUpperCase(),
            currencySymbol: newCountry.currencySymbol.trim().toUpperCase() || newCountry.defaultCurrency.trim().toUpperCase(),
            allowedCurrencies,
            provinces: [],
            timezones: [],
          }
        ],
      },
    }));
    setNewCountry({
      name: "",
      isoCode: "",
      phoneCode: "",
      defaultCurrency: "",
      currencySymbol: "",
      allowedCurrenciesText: "",
    });
    return true;
  };

  const removeCountry = (id) => {
    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: prev.location.countries.filter(c => c.id !== id),
      },
    }));
  };

  const toggleCountryEnabled = (id) => {
    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: prev.location.countries.map((country) =>
          country.id !== id
            ? country
            : {
                ...country,
                enabled: country.enabled === false,
              }
        ),
      },
    }));
  };

  const addProvince = () => {
    if (!newProvince.name.trim() || !newProvince.countryId) return false;

    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: prev.location.countries.map((country) =>
          country.id !== newProvince.countryId
            ? country
            : {
                ...country,
                provinces: [
                  ...(country.provinces || []),
                  {
                    id: `${country.id}-${newProvince.name.toLowerCase().replace(/\s+/g, "-")}`,
                    name: newProvince.name.trim(),
                    cities: [],
                  },
                ],
              }
        ),
      },
    }));
    setNewProvince({ name: "", countryId: "" });
    return true;
  };

  const removeProvince = (countryId, provinceId) => {
    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: prev.location.countries.map((country) =>
          country.id !== countryId
            ? country
            : {
                ...country,
                provinces: (country.provinces || []).filter((province) => province.id !== provinceId),
              }
        ),
      },
    }));
  };

  const addCity = () => {
    if (!newCity.name.trim() || !newCity.countryId || !newCity.provinceId) return false;

    const suburbs = newCity.suburbsText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: prev.location.countries.map((country) =>
          country.id !== newCity.countryId
            ? country
            : {
                ...country,
                provinces: (country.provinces || []).map((province) =>
                  province.id !== newCity.provinceId
                    ? province
                    : {
                        ...province,
                        cities: [
                          ...(province.cities || []),
                          {
                            id: `${province.id}-${newCity.name.toLowerCase().replace(/\s+/g, "-")}`,
                            name: newCity.name.trim(),
                            suburbs,
                          },
                        ],
                      }
                ),
              }
        ),
      },
    }));

    setNewCity({
      name: "",
      countryId: "",
      provinceId: "",
      suburbsText: "",
    });
    return true;
  };

  const removeCity = (countryId, provinceId, cityId) => {
    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: prev.location.countries.map((country) =>
          country.id !== countryId
            ? country
            : {
                ...country,
                provinces: (country.provinces || []).map((province) =>
                  province.id !== provinceId
                    ? province
                    : {
                        ...province,
                        cities: (province.cities || []).filter((city) => city.id !== cityId),
                      }
                ),
              }
        ),
      },
    }));
  };

  const addSuburb = () => {
    if (!newSuburb.name.trim() || !newSuburb.countryId || !newSuburb.provinceId || !newSuburb.cityId) return false;

    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: prev.location.countries.map((country) =>
          country.id !== newSuburb.countryId
            ? country
            : {
                ...country,
                provinces: (country.provinces || []).map((province) =>
                  province.id !== newSuburb.provinceId
                    ? province
                    : {
                        ...province,
                        cities: (province.cities || []).map((city) =>
                          city.id !== newSuburb.cityId
                            ? city
                            : {
                                ...city,
                                suburbs: Array.from(new Set([...(city.suburbs || []), newSuburb.name.trim()])),
                              }
                        ),
                      }
                ),
              }
        ),
      },
    }));

    setNewSuburb({
      name: "",
      countryId: "",
      provinceId: "",
      cityId: "",
    });
    return true;
  };

  const removeSuburb = (countryId, provinceId, cityId, suburbName) => {
    updateSettings((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        countries: prev.location.countries.map((country) =>
          country.id !== countryId
            ? country
            : {
                ...country,
                provinces: (country.provinces || []).map((province) =>
                  province.id !== provinceId
                    ? province
                    : {
                        ...province,
                        cities: (province.cities || []).map((city) =>
                          city.id !== cityId
                            ? city
                            : {
                                ...city,
                                suburbs: (city.suburbs || []).filter((suburb) => suburb !== suburbName),
                              }
                        ),
                      }
                ),
              }
        ),
      },
    }));
  };

  const addPropertyType = () => {
    if (!newPropertyType.trim()) return;
    
    updateSettings((prev) => ({
      ...prev,
      property: {
        ...prev.property,
        propertyTypes: [...prev.property.propertyTypes, newPropertyType],
      },
    }));
    setNewPropertyType("");
  };

  const removePropertyType = (type) => {
    updateSettings((prev) => ({
      ...prev,
      property: {
        ...prev.property,
        propertyTypes: prev.property.propertyTypes.filter(t => t !== type),
      },
    }));
  };

  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    
    updateSettings((prev) => ({
      ...prev,
      property: {
        ...prev.property,
        amenities: [...prev.property.amenities, newAmenity],
      },
    }));
    setNewAmenity("");
  };

  const removeAmenity = (amenity) => {
    updateSettings((prev) => ({
      ...prev,
      property: {
        ...prev.property,
        amenities: prev.property.amenities.filter(a => a !== amenity),
      },
    }));
  };

  // Handle content settings changes from WebsiteSettings component
  const handleContentSettingsChange = (contentSettings) => {
    updateSettings((prev) => ({
      ...prev,
      content: contentSettings
    }));
  };

  // Handle developer settings changes from DeveloperSettings component
  const handleDeveloperSettingsChange = (field, developerSettings) => {
    updateSettings((prev) => ({
      ...prev,
      developer: developerSettings
    }));
  };

  const saveSettings = async () => {
    if (_saveSettings) {
      const saved = await _saveSettings(settings);

      if (saved) {
        setIsDirty(false);
      }
    } else {
      toast.success("Settings saved successfully!");
      setIsDirty(false);
    }
  };

  const provinceRows = settings.location.countries.flatMap((country) =>
    (country.provinces || []).map((province) => ({
      countryId: country.id,
      countryName: country.name,
      province,
    }))
  );

  const cityRows = settings.location.countries.flatMap((country) =>
    (country.provinces || []).flatMap((province) =>
      (province.cities || []).map((city) => ({
        countryId: country.id,
        countryName: country.name,
        provinceId: province.id,
        provinceName: province.name,
        city,
      }))
    )
  );

  const suburbRows = settings.location.countries.flatMap((country) =>
    (country.provinces || []).flatMap((province) =>
      (province.cities || []).flatMap((city) =>
        (city.suburbs || []).map((suburb) => ({
          countryId: country.id,
          countryName: country.name,
          provinceId: province.id,
          provinceName: province.name,
          cityId: city.id,
          cityName: city.name,
          suburb,
        }))
      )
    )
  );
  const availableCountries = settings.location.countries.filter((country) => country.enabled !== false);
  const defaultCountryOptions = availableCountries.length > 0 ? availableCountries : settings.location.countries;

  return (
    <>
    <div className="container-fluid">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header">
              <h2>
                <strong>System</strong> Settings
              </h2>
            </div>
            <div className="body">
              {/* Tabs */}
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${activeTab === 'general' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('general')}
                  >
                    General
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${activeTab === 'location' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('location')}
                  >
                    Location
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${activeTab === 'property' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('property')}
                  >
                    Property Settings
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${showContentManagement ? 'active' : ''}`} 
                    onClick={() => handleTabChange('content')}
                  >
                    <i className="fa fa-edit"></i> Content Management
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${showDeveloperSettings ? 'active' : ''}`} 
                    onClick={() => handleTabChange('developer')}
                  >
                    <i className="fa fa-code"></i> Developer Settings
                  </button>
                </li>
              </ul>
              
              <div className="tab-content p-4">
                {/* General Settings Tab */}
                {activeTab === 'general' && (
                  <div>
                    <h4 className="mb-4">General Settings</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Site Name</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="siteName"
                            value={settings.general.siteName}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Default Language</label>
                          <select 
                            className="form-control"
                            name="defaultLanguage"
                            value={settings.general.defaultLanguage}
                            onChange={handleGeneralSettingsChange}
                          >
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Default Currency</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="defaultCurrency"
                            value={settings.general.defaultCurrency}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Default Currency Symbol</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="defaultCurrencySymbol"
                            value={settings.general.defaultCurrencySymbol}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Default Country</label>
                          <select
                            className="form-control"
                            name="defaultCountry"
                            value={settings.general.defaultCountry}
                            onChange={handleGeneralSettingsChange}
                          >
                            {defaultCountryOptions.map((country) => (
                              <option key={country.id} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Location Settings Tab */}
                {activeTab === 'location' && (
                  <div>
                    <h4 className="mb-4">Location Settings</h4>
                    <div className="location-subtabs">
                      <button
                        type="button"
                        className={`location-subtab ${locationTab === "countries" ? "active" : ""}`}
                        onClick={() => setLocationTab("countries")}
                      >
                        Countries
                      </button>
                      <button
                        type="button"
                        className={`location-subtab ${locationTab === "provinces" ? "active" : ""}`}
                        onClick={() => setLocationTab("provinces")}
                      >
                        Provinces / Regions
                      </button>
                      <button
                        type="button"
                        className={`location-subtab ${locationTab === "cities" ? "active" : ""}`}
                        onClick={() => setLocationTab("cities")}
                      >
                        Cities
                      </button>
                      <button
                        type="button"
                        className={`location-subtab ${locationTab === "suburbs" ? "active" : ""}`}
                        onClick={() => setLocationTab("suburbs")}
                      >
                        Suburbs
                      </button>
                    </div>

                    {locationTab === "countries" && (
                      <div className="card">
                        <div className="card-body">
                          <div className="location-panel-header">
                            <h5>Countries</h5>
                            <button
                              type="button"
                              className="internal-action-btn"
                              onClick={() => setLocationModal("country")}
                            >
                              <i className="fa fa-plus m-r-5" /> Add Country
                            </button>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-bordered location-panel-table">
                              <thead>
                                <tr>
                                  <th>Country Name</th>
                                  <th>Status</th>
                                  <th>ISO</th>
                                  <th>Phone Code</th>
                                  <th>Default Currency</th>
                                  <th>Allowed Currencies</th>
                                  <th width="220">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {settings.location.countries.map((country) => (
                                  <tr key={country.id}>
                                    <td>{country.name}</td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          country.enabled === false ? "badge-secondary" : "badge-success"
                                        }`}
                                      >
                                        {country.enabled === false ? "Disabled" : "Enabled"}
                                      </span>
                                    </td>
                                    <td>{country.isoCode}</td>
                                    <td>{country.phoneCode}</td>
                                    <td>{country.defaultCurrency}</td>
                                    <td>{(country.allowedCurrencies || []).join(", ")}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className={`btn btn-sm m-r-5 ${
                                          country.enabled === false ? "btn-success" : "btn-warning"
                                        }`}
                                        onClick={() => toggleCountryEnabled(country.id)}
                                      >
                                        {country.enabled === false ? "Enable" : "Disable"}
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeCountry(country.id)}
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {locationTab === "provinces" && (
                      <div className="card">
                        <div className="card-body">
                          <div className="location-panel-header">
                            <h5>Provinces / Regions</h5>
                            <button
                              type="button"
                              className="internal-action-btn"
                              onClick={() => setLocationModal("province")}
                            >
                              <i className="fa fa-plus m-r-5" /> Add Province / Region
                            </button>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-bordered location-panel-table">
                              <thead>
                                <tr>
                                  <th>Country</th>
                                  <th>Province / Region</th>
                                  <th width="100">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {provinceRows.map((row) => (
                                  <tr key={row.province.id}>
                                    <td>{row.countryName}</td>
                                    <td>{row.province.name}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeProvince(row.countryId, row.province.id)}
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {locationTab === "cities" && (
                      <div className="card">
                        <div className="card-body">
                          <div className="location-panel-header">
                            <h5>Cities</h5>
                            <button
                              type="button"
                              className="internal-action-btn"
                              onClick={() => setLocationModal("city")}
                            >
                              <i className="fa fa-plus m-r-5" /> Add City
                            </button>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-bordered location-panel-table">
                              <thead>
                                <tr>
                                  <th>Country</th>
                                  <th>Province / Region</th>
                                  <th>City</th>
                                  <th>Suburbs Count</th>
                                  <th width="100">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cityRows.map((row) => (
                                  <tr key={row.city.id}>
                                    <td>{row.countryName}</td>
                                    <td>{row.provinceName}</td>
                                    <td>{row.city.name}</td>
                                    <td>{(row.city.suburbs || []).length}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeCity(row.countryId, row.provinceId, row.city.id)}
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {locationTab === "suburbs" && (
                      <div className="card">
                        <div className="card-body">
                          <div className="location-panel-header">
                            <h5>Suburbs</h5>
                            <button
                              type="button"
                              className="internal-action-btn"
                              onClick={() => setLocationModal("suburb")}
                            >
                              <i className="fa fa-plus m-r-5" /> Add Suburb
                            </button>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-bordered location-panel-table">
                              <thead>
                                <tr>
                                  <th>Country</th>
                                  <th>Province / Region</th>
                                  <th>City</th>
                                  <th>Suburb</th>
                                  <th width="100">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {suburbRows.map((row) => (
                                  <tr key={`${row.cityId}-${row.suburb}`}>
                                    <td>{row.countryName}</td>
                                    <td>{row.provinceName}</td>
                                    <td>{row.cityName}</td>
                                    <td>{row.suburb}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                          removeSuburb(row.countryId, row.provinceId, row.cityId, row.suburb)
                                        }
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Property Settings Tab */}
                {activeTab === 'property' && (
                  <div>
                    <h4 className="mb-4">Property Settings</h4>
                    
                    {/* Property Types Section */}
                    <div className="card mb-4">
                      <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Property Types</h5>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-8">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Add new property type"
                              value={newPropertyType}
                              onChange={(e) => setNewPropertyType(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <button 
                              className="btn btn-primary w-100"
                              onClick={addPropertyType}
                            >
                              Add Property Type
                            </button>
                          </div>
                        </div>
                        
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Property Type</th>
                                <th width="100">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {settings.property.propertyTypes.map((type, index) => (
                                <tr key={index}>
                                  <td>{type}</td>
                                  <td>
                                    <button 
                                      className="btn btn-sm btn-danger"
                                      onClick={() => removePropertyType(type)}
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    
                    {/* Amenities Section */}
                    <div className="card">
                      <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Amenities</h5>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-8">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Add new amenity"
                              value={newAmenity}
                              onChange={(e) => setNewAmenity(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <button 
                              className="btn btn-primary w-100"
                              onClick={addAmenity}
                            >
                              Add Amenity
                            </button>
                          </div>
                        </div>
                        
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Amenity</th>
                                <th width="100">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {settings.property.amenities.map((amenity, index) => (
                                <tr key={index}>
                                  <td>{amenity}</td>
                                  <td>
                                    <button 
                                      className="btn btn-sm btn-danger"
                                      onClick={() => removeAmenity(amenity)}
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Content Management Tab */}
                {showContentManagement && (
                  <WebsiteSettings 
                    contentSettings={settings.content}
                    onSettingsChange={handleContentSettingsChange}
                    parentSaveFunction={saveSettings}
                  />
                )}
                
                {showDeveloperSettings && (
                  <DeveloperSettings 
                    settings={settings}
                    onSettingsChange={handleDeveloperSettingsChange}
                  />
                )}
              </div>
              
              <div className="mt-4">
                {loading ? (
                  <Loader />
                ) : (
                  <button 
                    type="button" 
                    className="btn btn-primary btn-round"
                    onClick={saveSettings}
                  >
                    Save Settings
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {locationModal === "country" && (
      <DashboardModal title="Add Country" onClose={() => setLocationModal("")} size="medium">
        <div className="dashboard-modal-form-grid">
          <input
            type="text"
            className="form-control"
            placeholder="Country name"
            value={newCountry.name}
            onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="ISO code"
            value={newCountry.isoCode}
            onChange={(e) => setNewCountry({ ...newCountry, isoCode: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Phone code"
            value={newCountry.phoneCode}
            onChange={(e) => setNewCountry({ ...newCountry, phoneCode: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Default currency"
            value={newCountry.defaultCurrency}
            onChange={(e) => setNewCountry({ ...newCountry, defaultCurrency: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Currency symbol"
            value={newCountry.currencySymbol}
            onChange={(e) => setNewCountry({ ...newCountry, currencySymbol: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Allowed currencies, comma separated"
            value={newCountry.allowedCurrenciesText}
            onChange={(e) => setNewCountry({ ...newCountry, allowedCurrenciesText: e.target.value })}
          />
        </div>
        <div className="dashboard-modal-footer">
          <button type="button" className="btn btn-default btn-round" onClick={() => setLocationModal("")}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-round"
            onClick={() => {
              if (addCountry()) {
                setLocationModal("");
              }
            }}
          >
            Save Country
          </button>
        </div>
      </DashboardModal>
    )}

    {locationModal === "province" && (
      <DashboardModal title="Add Province / Region" onClose={() => setLocationModal("")} size="medium">
        <div className="dashboard-modal-form-grid">
          <select
            className="form-control"
            value={newProvince.countryId}
            onChange={(e) => setNewProvince({ ...newProvince, countryId: e.target.value })}
          >
            <option value="">Select Country</option>
            {settings.location.countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Province / Region name"
            value={newProvince.name}
            onChange={(e) => setNewProvince({ ...newProvince, name: e.target.value })}
          />
        </div>
        <div className="dashboard-modal-footer">
          <button type="button" className="btn btn-default btn-round" onClick={() => setLocationModal("")}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-round"
            onClick={() => {
              if (addProvince()) {
                setLocationModal("");
              }
            }}
          >
            Save Province
          </button>
        </div>
      </DashboardModal>
    )}

    {locationModal === "city" && (
      <DashboardModal title="Add City" onClose={() => setLocationModal("")} size="medium">
        <div className="dashboard-modal-form-grid">
          <select
            className="form-control"
            value={newCity.countryId}
            onChange={(e) => setNewCity({ ...newCity, countryId: e.target.value, provinceId: "" })}
          >
            <option value="">Select Country</option>
            {settings.location.countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            value={newCity.provinceId}
            onChange={(e) => setNewCity({ ...newCity, provinceId: e.target.value })}
          >
            <option value="">Select Province / Region</option>
            {(settings.location.countries.find((country) => country.id === newCity.countryId)?.provinces || []).map(
              (province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              )
            )}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="City name"
            value={newCity.name}
            onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Optional suburbs, comma separated"
            value={newCity.suburbsText}
            onChange={(e) => setNewCity({ ...newCity, suburbsText: e.target.value })}
          />
        </div>
        <div className="dashboard-modal-footer">
          <button type="button" className="btn btn-default btn-round" onClick={() => setLocationModal("")}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-round"
            onClick={() => {
              if (addCity()) {
                setLocationModal("");
              }
            }}
          >
            Save City
          </button>
        </div>
      </DashboardModal>
    )}

    {locationModal === "suburb" && (
      <DashboardModal title="Add Suburb" onClose={() => setLocationModal("")} size="medium">
        <div className="dashboard-modal-form-grid">
          <select
            className="form-control"
            value={newSuburb.countryId}
            onChange={(e) =>
              setNewSuburb({ ...newSuburb, countryId: e.target.value, provinceId: "", cityId: "" })
            }
          >
            <option value="">Select Country</option>
            {settings.location.countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <select
            className="form-control"
            value={newSuburb.provinceId}
            onChange={(e) => setNewSuburb({ ...newSuburb, provinceId: e.target.value, cityId: "" })}
          >
            <option value="">Select Province / Region</option>
            {(settings.location.countries.find((country) => country.id === newSuburb.countryId)?.provinces || []).map(
              (province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              )
            )}
          </select>
          <select
            className="form-control"
            value={newSuburb.cityId}
            onChange={(e) => setNewSuburb({ ...newSuburb, cityId: e.target.value })}
          >
            <option value="">Select City</option>
            {(
              settings.location.countries
                .find((country) => country.id === newSuburb.countryId)
                ?.provinces?.find((province) => province.id === newSuburb.provinceId)?.cities || []
            ).map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Suburb name"
            value={newSuburb.name}
            onChange={(e) => setNewSuburb({ ...newSuburb, name: e.target.value })}
          />
        </div>
        <div className="dashboard-modal-footer">
          <button type="button" className="btn btn-default btn-round" onClick={() => setLocationModal("")}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary btn-round"
            onClick={() => {
              if (addSuburb()) {
                setLocationModal("");
              }
            }}
          >
            Save Suburb
          </button>
        </div>
      </DashboardModal>
    )}
    </>
  );
}
