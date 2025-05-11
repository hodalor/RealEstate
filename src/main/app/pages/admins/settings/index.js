import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../../../libs/contexts/adminContext";
import { AuthContext } from "../../../../libs/contexts/authContext";
import Notify from "../../../../components/notification";
import Loader from "../../../../components/loader";

export default function Settings() {
  const { adminData, _handleSettingsChange, _saveSettings, _fetchSettings } = useContext(AdminContext);
  const { loading } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('general');
  
  // Local state for settings
  const [settings, setSettings] = useState({
    general: {
      siteName: "RealEstate",
      currency: "GHC",
      currencySymbol: "₵",
      defaultLanguage: "English",
    },
    location: {
      countries: [
        { id: 1, name: "Ghana" },
        { id: 2, name: "Nigeria" },
        { id: 3, name: "South Africa" },
        { id: 4, name: "Kenya" },
        { id: 5, name: "Egypt" },
      ],
      provinces: [
        { id: 1, countryId: 1, name: "Greater Accra" },
        { id: 2, countryId: 1, name: "Ashanti" },
        { id: 3, countryId: 1, name: "Western" },
        { id: 4, countryId: 1, name: "Eastern" },
        { id: 5, countryId: 1, name: "Central" },
        { id: 6, countryId: 1, name: "Volta" },
        { id: 7, countryId: 1, name: "Northern" },
        { id: 8, countryId: 2, name: "Lagos" },
        { id: 9, countryId: 2, name: "Abuja" },
      ],
    },
    property: {
      propertyTypes: [
        "Single room",
        "Apartment",
        "Full house",
        "Office",
        "Shop",
        "Land",
        "Warehouse",
      ],
      amenities: [
        "Swimming Pool",
        "Pipe Water",
        "Air Conditioning",
        "Electricity",
        "Near Main Road",
        "Near Supermarket",
        "Pets Allowed",
        "Security",
        "Internet",
        "Gym",
      ],
    },
  });

  // New country and province state
  const [newCountry, setNewCountry] = useState("");
  const [newProvince, setNewProvince] = useState({ name: "", countryId: "" });
  const [newPropertyType, setNewPropertyType] = useState("");
  const [newAmenity, setNewAmenity] = useState("");

  // Load settings from context or API when component mounts
  useEffect(() => {
    // If settings exist in adminData, use them
    if (adminData.settings) {
      setSettings(adminData.settings);
    } else {
      // Fetch settings from backend
      _fetchSettings();
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: value,
      },
    });
  };

  const addCountry = () => {
    if (!newCountry.trim()) return;
    
    const newId = settings.location.countries.length > 0 
      ? Math.max(...settings.location.countries.map(c => c.id)) + 1 
      : 1;
      
    setSettings({
      ...settings,
      location: {
        ...settings.location,
        countries: [
          ...settings.location.countries,
          { id: newId, name: newCountry }
        ],
      },
    });
    setNewCountry("");
  };

  const removeCountry = (id) => {
    setSettings({
      ...settings,
      location: {
        ...settings.location,
        countries: settings.location.countries.filter(c => c.id !== id),
        // Also remove provinces associated with this country
        provinces: settings.location.provinces.filter(p => p.countryId !== id),
      },
    });
  };

  const addProvince = () => {
    if (!newProvince.name.trim() || !newProvince.countryId) return;
    
    const newId = settings.location.provinces.length > 0 
      ? Math.max(...settings.location.provinces.map(p => p.id)) + 1 
      : 1;
      
    setSettings({
      ...settings,
      location: {
        ...settings.location,
        provinces: [
          ...settings.location.provinces,
          { id: newId, countryId: parseInt(newProvince.countryId), name: newProvince.name }
        ],
      },
    });
    setNewProvince({ name: "", countryId: "" });
  };

  const removeProvince = (id) => {
    setSettings({
      ...settings,
      location: {
        ...settings.location,
        provinces: settings.location.provinces.filter(p => p.id !== id),
      },
    });
  };

  const addPropertyType = () => {
    if (!newPropertyType.trim()) return;
    
    setSettings({
      ...settings,
      property: {
        ...settings.property,
        propertyTypes: [...settings.property.propertyTypes, newPropertyType],
      },
    });
    setNewPropertyType("");
  };

  const removePropertyType = (type) => {
    setSettings({
      ...settings,
      property: {
        ...settings.property,
        propertyTypes: settings.property.propertyTypes.filter(t => t !== type),
      },
    });
  };

  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    
    setSettings({
      ...settings,
      property: {
        ...settings.property,
        amenities: [...settings.property.amenities, newAmenity],
      },
    });
    setNewAmenity("");
  };

  const removeAmenity = (amenity) => {
    setSettings({
      ...settings,
      property: {
        ...settings.property,
        amenities: settings.property.amenities.filter(a => a !== amenity),
      },
    });
  };

  const saveSettings = () => {
    // Call the context function to save settings to backend
    if (_saveSettings) {
      _saveSettings(settings);
    } else {
      console.log("Settings saved:", settings);
      // For now, just log the settings
      alert("Settings saved successfully!");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header">
              <h2>
                <strong>System</strong> Settings
              </h2>
            </div>
            <Notify />
            <div className="body">
              {/* Tabs */}
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'general' ? 'active' : ''}`} 
                    href="#" 
                    onClick={() => handleTabChange('general')}
                  >
                    General
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'location' ? 'active' : ''}`} 
                    href="#" 
                    onClick={() => handleTabChange('location')}
                  >
                    Location
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'property' ? 'active' : ''}`} 
                    href="#" 
                    onClick={() => handleTabChange('property')}
                  >
                    Property Settings
                  </a>
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
                          <label>Currency</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="currency"
                            value={settings.general.currency}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Currency Symbol</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="currencySymbol"
                            value={settings.general.currencySymbol}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Location Settings Tab */}
                {activeTab === 'location' && (
                  <div>
                    <h4 className="mb-4">Location Settings</h4>
                    
                    {/* Countries Section */}
                    <div className="card mb-4">
                      <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Countries</h5>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-8">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Add new country"
                              value={newCountry}
                              onChange={(e) => setNewCountry(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <button 
                              className="btn btn-primary w-100"
                              onClick={addCountry}
                            >
                              Add Country
                            </button>
                          </div>
                        </div>
                        
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Country Name</th>
                                <th width="100">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {settings.location.countries.map(country => (
                                <tr key={country.id}>
                                  <td>{country.name}</td>
                                  <td>
                                    <button 
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
                    
                    {/* Provinces/States Section */}
                    <div className="card">
                      <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Provinces/States</h5>
                      </div>
                      <div className="card-body">
                        <div className="row mb-3">
                          <div className="col-md-4">
                            <select 
                              className="form-control"
                              value={newProvince.countryId}
                              onChange={(e) => setNewProvince({...newProvince, countryId: e.target.value})}
                            >
                              <option value="">Select Country</option>
                              {settings.location.countries.map(country => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-4">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Province/State name"
                              value={newProvince.name}
                              onChange={(e) => setNewProvince({...newProvince, name: e.target.value})}
                            />
                          </div>
                          <div className="col-md-4">
                            <button 
                              className="btn btn-primary w-100"
                              onClick={addProvince}
                            >
                              Add Province/State
                            </button>
                          </div>
                        </div>
                        
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Country</th>
                                <th>Province/State</th>
                                <th width="100">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {settings.location.provinces.map(province => {
                                const country = settings.location.countries.find(c => c.id === province.countryId);
                                return (
                                  <tr key={province.id}>
                                    <td>{country ? country.name : 'Unknown'}</td>
                                    <td>{province.name}</td>
                                    <td>
                                      <button 
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeProvince(province.id)}
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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
  );
}