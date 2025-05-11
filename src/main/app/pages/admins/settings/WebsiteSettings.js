import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function WebsiteSettings({ contentSettings, onSettingsChange, parentSaveFunction }) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [settings, setSettings] = useState({
    hero: {
      title: 'Find Your Dream Property',
      subtitle: 'Discover the perfect home with our extensive listings of properties. Whether you\'re looking to buy, rent, or sell, we\'ve got you covered.',
      buttonText: 'Get Started',
      backgroundImage: ''
    },
    footer: {
      aboutText: 'We are dedicated to providing the best real estate services to help you find your dream property.',
      address: '123 Real Estate St, Accra',
      phone: '+233 123 456 789',
      email: 'info@realestate.com',
      socialLinks: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    advertisements: [
      {
        id: 1,
        title: 'Premium Properties',
        description: 'Exclusive listings for our premium clients',
        image: '',
        link: '/properties?premium=true',
        active: true
      },
      {
        id: 2,
        title: 'New Developments',
        description: 'Check out our latest property developments',
        image: '',
        link: '/properties?new=true',
        active: false
      }
    ]
  });

  // Use content settings from parent component if available
  useEffect(() => {
    if (contentSettings) {
      setSettings(contentSettings);
    }
  }, [contentSettings]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    const updatedSettings = {
      ...settings,
      hero: {
        ...settings.hero,
        [name]: value
      }
    };
    setSettings(updatedSettings);
    onSettingsChange && onSettingsChange(updatedSettings);
  };

  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    let updatedSettings;
    
    if (name.includes('.')) {
      // Handle nested properties like socialLinks.facebook
      const [parent, child] = name.split('.');
      updatedSettings = {
        ...settings,
        footer: {
          ...settings.footer,
          [parent]: {
            ...settings.footer[parent],
            [child]: value
          }
        }
      };
    } else {
      updatedSettings = {
        ...settings,
        footer: {
          ...settings.footer,
          [name]: value
        }
      };
    }
    
    setSettings(updatedSettings);
    onSettingsChange && onSettingsChange(updatedSettings);
  };

  const handleAdChange = (id, field, value) => {
    const updatedSettings = {
      ...settings,
      advertisements: settings.advertisements.map(ad => 
        ad.id === id ? { ...ad, [field]: value } : ad
      )
    };
    
    setSettings(updatedSettings);
    onSettingsChange && onSettingsChange(updatedSettings);
  };

  const handleAdToggle = (id) => {
    const updatedSettings = {
      ...settings,
      advertisements: settings.advertisements.map(ad => 
        ad.id === id ? { ...ad, active: !ad.active } : ad
      )
    };
    
    setSettings(updatedSettings);
    onSettingsChange && onSettingsChange(updatedSettings);
  };

  const handleSaveSettings = () => {
    setLoading(true);
    
    // Use the parent's save function if available
    if (parentSaveFunction) {
      parentSaveFunction();
      setLoading(false);
    } else {
      // Fallback to local storage if no parent function
      setTimeout(() => {
        localStorage.setItem('websiteSettings', JSON.stringify(settings));
        setLoading(false);
        toast.success('Website settings saved successfully!');
      }, 1000);
    }
  };

  return (
    <div className="container-fluid">
      <div className="block-header">
        <div className="row">
          <div className="col-lg-5 col-md-8 col-sm-12">
            <h2><i className="fa fa-cog"></i> Website Settings</h2>
          </div>
        </div>
      </div>

      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header">
              <h2>Manage Website Content</h2>
            </div>
            <div className="body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'hero' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleTabChange('hero'); }}
                  >
                    Hero Section
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'footer' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleTabChange('footer'); }}
                  >
                    Footer Information
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeTab === 'ads' ? 'active' : ''}`} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleTabChange('ads'); }}
                  >
                    Advertisement Banners
                  </a>
                </li>
              </ul>

              <div className="tab-content p-4">
                {/* Hero Section Tab */}
                {activeTab === 'hero' && (
                  <div className="tab-pane active">
                    <h4 className="mb-4">Hero Section Content</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Hero Title</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="title" 
                            value={settings.hero.title} 
                            onChange={handleHeroChange} 
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Hero Subtitle</label>
                          <textarea 
                            className="form-control" 
                            name="subtitle" 
                            rows="3" 
                            value={settings.hero.subtitle} 
                            onChange={handleHeroChange}
                          ></textarea>
                        </div>
                        <div className="form-group mb-3">
                          <label>Button Text</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="buttonText" 
                            value={settings.hero.buttonText} 
                            onChange={handleHeroChange} 
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Background Image URL</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="backgroundImage" 
                            value={settings.hero.backgroundImage} 
                            onChange={handleHeroChange} 
                            placeholder="Enter image URL or upload" 
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Upload Background Image</label>
                          <input type="file" className="form-control" />
                          <small className="text-muted">Recommended size: 1920x1080px</small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="preview-box p-3 border rounded">
                          <h5>Preview</h5>
                          <div className="hero-preview p-4 bg-light rounded" style={{ minHeight: '300px' }}>
                            <h2>{settings.hero.title}</h2>
                            <p>{settings.hero.subtitle}</p>
                            <button className="btn btn-primary">{settings.hero.buttonText}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Information Tab */}
                {activeTab === 'footer' && (
                  <div className="tab-pane active">
                    <h4 className="mb-4">Footer Information</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>About Text</label>
                          <textarea 
                            className="form-control" 
                            name="aboutText" 
                            rows="3" 
                            value={settings.footer.aboutText} 
                            onChange={handleFooterChange}
                          ></textarea>
                        </div>
                        <div className="form-group mb-3">
                          <label>Address</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="address" 
                            value={settings.footer.address} 
                            onChange={handleFooterChange} 
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Phone Number</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="phone" 
                            value={settings.footer.phone} 
                            onChange={handleFooterChange} 
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Email Address</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            value={settings.footer.email} 
                            onChange={handleFooterChange} 
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <h5>Social Media Links</h5>
                        <div className="form-group mb-3">
                          <label>Facebook</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="socialLinks.facebook" 
                            value={settings.footer.socialLinks.facebook} 
                            onChange={handleFooterChange} 
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Twitter</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="socialLinks.twitter" 
                            value={settings.footer.socialLinks.twitter} 
                            onChange={handleFooterChange} 
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>Instagram</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="socialLinks.instagram" 
                            value={settings.footer.socialLinks.instagram} 
                            onChange={handleFooterChange} 
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label>LinkedIn</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            name="socialLinks.linkedin" 
                            value={settings.footer.socialLinks.linkedin} 
                            onChange={handleFooterChange} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Advertisement Banners Tab */}
                {activeTab === 'ads' && (
                  <div className="tab-pane active">
                    <h4 className="mb-4">Advertisement Banners</h4>
                    <div className="row">
                      {settings.advertisements.map((ad) => (
                        <div className="col-md-6 mb-4" key={ad.id}>
                          <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                              <h5 className="mb-0">Banner #{ad.id}</h5>
                              <div className="form-check form-switch">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox" 
                                  checked={ad.active} 
                                  onChange={() => handleAdToggle(ad.id)} 
                                />
                                <label className="form-check-label">{ad.active ? 'Active' : 'Inactive'}</label>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="form-group mb-3">
                                <label>Title</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  value={ad.title} 
                                  onChange={(e) => handleAdChange(ad.id, 'title', e.target.value)} 
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label>Description</label>
                                <textarea 
                                  className="form-control" 
                                  rows="2" 
                                  value={ad.description} 
                                  onChange={(e) => handleAdChange(ad.id, 'description', e.target.value)}
                                ></textarea>
                              </div>
                              <div className="form-group mb-3">
                                <label>Link URL</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  value={ad.link} 
                                  onChange={(e) => handleAdChange(ad.id, 'link', e.target.value)} 
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label>Image URL</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  value={ad.image} 
                                  onChange={(e) => handleAdChange(ad.id, 'image', e.target.value)} 
                                  placeholder="Enter image URL or upload" 
                                />
                              </div>
                              <div className="form-group mb-3">
                                <label>Upload Image</label>
                                <input type="file" className="form-control" />
                                <small className="text-muted">Recommended size: 800x400px</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="col-12 mt-3">
                        <button className="btn btn-outline-primary">
                          <i className="fa fa-plus"></i> Add New Banner
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 text-end">
                <button 
                  className="btn btn-primary" 
                  onClick={handleSaveSettings} 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}