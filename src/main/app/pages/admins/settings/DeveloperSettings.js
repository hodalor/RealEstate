import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function DeveloperSettings({ settings, onSettingsChange }) {
  // State for API keys and developer settings
  const [developerSettings, setDeveloperSettings] = useState({
    apiKeys: {
      firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: ''
      },
      payment: {
        paystack: {
          publicKey: '',
          secretKey: ''
        },
        flutterwave: {
          publicKey: '',
          secretKey: ''
        },
        momo: {
          apiKey: '',
          userId: ''
        }
      },
      maps: {
        googleMaps: {
          apiKey: ''
        }
      }
    },
    generatedApis: [
      // Example of a generated API
      // {
      //   id: 'api-123',
      //   name: 'Property Listings API',
      //   key: 'a1b2c3d4e5f6g7h8i9j0',
      //   permissions: ['read'],
      //   createdAt: '2023-01-01T00:00:00.000Z',
      //   lastUsed: '2023-01-15T00:00:00.000Z',
      //   status: 'active'
      // }
    ],
    webhooks: [
      // Example of a webhook
      // {
      //   id: 'wh-123',
      //   name: 'New Property Notification',
      //   url: 'https://example.com/webhook',
      //   events: ['property.created'],
      //   createdAt: '2023-01-01T00:00:00.000Z',
      //   status: 'active'
      // }
    ]
  });

  // Form state for new API key
  const [newApiForm, setNewApiForm] = useState({
    name: '',
    permissions: {
      read: true,
      write: false,
      delete: false
    },
    description: ''
  });

  // Form state for new webhook
  const [newWebhookForm, setNewWebhookForm] = useState({
    name: '',
    url: '',
    events: {
      'property.created': false,
      'property.updated': false,
      'property.deleted': false,
      'booking.created': false,
      'booking.updated': false,
      'booking.cancelled': false,
      'payment.received': false,
      'payment.failed': false
    },
    description: ''
  });

  // Load developer settings from props
  useEffect(() => {
    if (settings && settings.developer) {
      setDeveloperSettings(settings.developer);
    }
  }, [settings]);

  // Handle API key input changes
  const handleApiKeyChange = (service, provider, key, value) => {
    setDeveloperSettings(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [service]: {
          ...prev.apiKeys[service],
          [provider]: {
            ...prev.apiKeys[service][provider],
            [key]: value
          }
        }
      }
    }));

    // Update parent component's state
    const updatedSettings = {
      ...settings,
      developer: {
        ...settings.developer,
        apiKeys: {
          ...settings.developer?.apiKeys,
          [service]: {
            ...settings.developer?.apiKeys?.[service],
            [provider]: {
              ...settings.developer?.apiKeys?.[service]?.[provider],
              [key]: value
            }
          }
        }
      }
    };
    onSettingsChange('developer', updatedSettings.developer);
  };

  // Handle new API form changes
  const handleNewApiFormChange = (field, value) => {
    if (field === 'permissions') {
      const [permission, checked] = value;
      setNewApiForm(prev => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [permission]: checked
        }
      }));
    } else {
      setNewApiForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handle new webhook form changes
  const handleNewWebhookFormChange = (field, value) => {
    if (field === 'events') {
      const [event, checked] = value;
      setNewWebhookForm(prev => ({
        ...prev,
        events: {
          ...prev.events,
          [event]: checked
        }
      }));
    } else {
      setNewWebhookForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Generate new API key
  const generateApiKey = () => {
    if (!newApiForm.name) {
      toast.error('API name is required');
      return;
    }

    // Check if at least one permission is selected
    const hasPermission = Object.values(newApiForm.permissions).some(p => p);
    if (!hasPermission) {
      toast.error('At least one permission must be selected');
      return;
    }

    // Generate a random API key
    const apiKey = Array(30)
      .fill(0)
      .map(() => Math.random().toString(36).charAt(2))
      .join('');

    // Create new API object
    const newApi = {
      id: `api-${Date.now()}`,
      name: newApiForm.name,
      key: apiKey,
      permissions: Object.entries(newApiForm.permissions)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      description: newApiForm.description,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      status: 'active'
    };

    // Update state
    const updatedGeneratedApis = [...developerSettings.generatedApis, newApi];
    setDeveloperSettings(prev => ({
      ...prev,
      generatedApis: updatedGeneratedApis
    }));

    // Update parent component's state
    const updatedSettings = {
      ...settings,
      developer: {
        ...settings.developer,
        generatedApis: updatedGeneratedApis
      }
    };
    onSettingsChange('developer', updatedSettings.developer);

    // Reset form
    setNewApiForm({
      name: '',
      permissions: {
        read: true,
        write: false,
        delete: false
      },
      description: ''
    });

    toast.success('API key generated successfully');
  };

  // Create new webhook
  const createWebhook = () => {
    if (!newWebhookForm.name || !newWebhookForm.url) {
      toast.error('Webhook name and URL are required');
      return;
    }

    // Check if at least one event is selected
    const hasEvent = Object.values(newWebhookForm.events).some(e => e);
    if (!hasEvent) {
      toast.error('At least one event must be selected');
      return;
    }

    // Validate URL
    try {
      new URL(newWebhookForm.url);
    } catch (e) {
      toast.error('Invalid URL format');
      return;
    }

    // Create new webhook object
    const newWebhook = {
      id: `wh-${Date.now()}`,
      name: newWebhookForm.name,
      url: newWebhookForm.url,
      events: Object.entries(newWebhookForm.events)
        .filter(([_, value]) => value)
        .map(([key]) => key),
      description: newWebhookForm.description,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    // Update state
    const updatedWebhooks = [...developerSettings.webhooks, newWebhook];
    setDeveloperSettings(prev => ({
      ...prev,
      webhooks: updatedWebhooks
    }));

    // Update parent component's state
    const updatedSettings = {
      ...settings,
      developer: {
        ...settings.developer,
        webhooks: updatedWebhooks
      }
    };
    onSettingsChange('developer', updatedSettings.developer);

    // Reset form
    setNewWebhookForm({
      name: '',
      url: '',
      events: {
        'property.created': false,
        'property.updated': false,
        'property.deleted': false,
        'booking.created': false,
        'booking.updated': false,
        'booking.cancelled': false,
        'payment.received': false,
        'payment.failed': false
      },
      description: ''
    });

    toast.success('Webhook created successfully');
  };

  // Toggle API key status (active/inactive)
  const toggleApiStatus = (apiId) => {
    const updatedApis = developerSettings.generatedApis.map(api => {
      if (api.id === apiId) {
        return {
          ...api,
          status: api.status === 'active' ? 'inactive' : 'active'
        };
      }
      return api;
    });

    setDeveloperSettings(prev => ({
      ...prev,
      generatedApis: updatedApis
    }));

    // Update parent component's state
    const updatedSettings = {
      ...settings,
      developer: {
        ...settings.developer,
        generatedApis: updatedApis
      }
    };
    onSettingsChange('developer', updatedSettings.developer);

    toast.success('API status updated');
  };

  // Toggle webhook status (active/inactive)
  const toggleWebhookStatus = (webhookId) => {
    const updatedWebhooks = developerSettings.webhooks.map(webhook => {
      if (webhook.id === webhookId) {
        return {
          ...webhook,
          status: webhook.status === 'active' ? 'inactive' : 'active'
        };
      }
      return webhook;
    });

    setDeveloperSettings(prev => ({
      ...prev,
      webhooks: updatedWebhooks
    }));

    // Update parent component's state
    const updatedSettings = {
      ...settings,
      developer: {
        ...settings.developer,
        webhooks: updatedWebhooks
      }
    };
    onSettingsChange('developer', updatedSettings.developer);

    toast.success('Webhook status updated');
  };

  // Delete API key
  const deleteApi = (apiId) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      const updatedApis = developerSettings.generatedApis.filter(api => api.id !== apiId);
      
      setDeveloperSettings(prev => ({
        ...prev,
        generatedApis: updatedApis
      }));

      // Update parent component's state
      const updatedSettings = {
        ...settings,
        developer: {
          ...settings.developer,
          generatedApis: updatedApis
        }
      };
      onSettingsChange('developer', updatedSettings.developer);

      toast.success('API key deleted');
    }
  };

  // Delete webhook
  const deleteWebhook = (webhookId) => {
    if (window.confirm('Are you sure you want to delete this webhook? This action cannot be undone.')) {
      const updatedWebhooks = developerSettings.webhooks.filter(webhook => webhook.id !== webhookId);
      
      setDeveloperSettings(prev => ({
        ...prev,
        webhooks: updatedWebhooks
      }));

      // Update parent component's state
      const updatedSettings = {
        ...settings,
        developer: {
          ...settings.developer,
          webhooks: updatedWebhooks
        }
      };
      onSettingsChange('developer', updatedSettings.developer);

      toast.success('Webhook deleted');
    }
  };

  return (
    <div className="tab-pane" id="developer">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="header">
              <h2><strong>Developer</strong> Settings</h2>
            </div>
            <div className="body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active show" data-toggle="tab" href="#api-keys">API Keys</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#generated-apis">Generated APIs</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#webhooks">Webhooks</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#documentation">Documentation</a>
                </li>
              </ul>
              
              <div className="tab-content p-l-0 p-r-0 p-t-20">
                {/* API Keys Tab */}
                <div className="tab-pane active show" id="api-keys">
                  <div className="row clearfix">
                    <div className="col-lg-12">
                      <div className="alert alert-info">
                        <strong>Note:</strong> These API keys are used to connect external services to your RealEstate platform.
                        Keep these keys secure and never expose them in client-side code.
                      </div>
                      
                      {/* Firebase Configuration */}
                      <div className="card">
                        <div className="header bg-blue">
                          <h2><i className="fa fa-database"></i> <strong>Firebase</strong> Configuration</h2>
                        </div>
                        <div className="body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>API Key</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Firebase API Key"
                                  value={developerSettings.apiKeys?.firebase?.apiKey || ''}
                                  onChange={(e) => handleApiKeyChange('firebase', 'firebase', 'apiKey', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Auth Domain</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Firebase Auth Domain"
                                  value={developerSettings.apiKeys?.firebase?.authDomain || ''}
                                  onChange={(e) => handleApiKeyChange('firebase', 'firebase', 'authDomain', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Project ID</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Firebase Project ID"
                                  value={developerSettings.apiKeys?.firebase?.projectId || ''}
                                  onChange={(e) => handleApiKeyChange('firebase', 'firebase', 'projectId', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Storage Bucket</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Firebase Storage Bucket"
                                  value={developerSettings.apiKeys?.firebase?.storageBucket || ''}
                                  onChange={(e) => handleApiKeyChange('firebase', 'firebase', 'storageBucket', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Messaging Sender ID</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Firebase Messaging Sender ID"
                                  value={developerSettings.apiKeys?.firebase?.messagingSenderId || ''}
                                  onChange={(e) => handleApiKeyChange('firebase', 'firebase', 'messagingSenderId', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>App ID</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Firebase App ID"
                                  value={developerSettings.apiKeys?.firebase?.appId || ''}
                                  onChange={(e) => handleApiKeyChange('firebase', 'firebase', 'appId', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Gateways */}
                      <div className="card">
                        <div className="header bg-green">
                          <h2><i className="fa fa-credit-card"></i> <strong>Payment</strong> Gateways</h2>
                        </div>
                        <div className="body">
                          <div className="row">
                            <div className="col-md-6">
                              <h5>Paystack</h5>
                              <div className="form-group">
                                <label>Public Key</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Paystack Public Key"
                                  value={developerSettings.apiKeys?.payment?.paystack?.publicKey || ''}
                                  onChange={(e) => handleApiKeyChange('payment', 'paystack', 'publicKey', e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label>Secret Key</label>
                                <input 
                                  type="password" 
                                  className="form-control" 
                                  placeholder="Paystack Secret Key"
                                  value={developerSettings.apiKeys?.payment?.paystack?.secretKey || ''}
                                  onChange={(e) => handleApiKeyChange('payment', 'paystack', 'secretKey', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <h5>Flutterwave</h5>
                              <div className="form-group">
                                <label>Public Key</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Flutterwave Public Key"
                                  value={developerSettings.apiKeys?.payment?.flutterwave?.publicKey || ''}
                                  onChange={(e) => handleApiKeyChange('payment', 'flutterwave', 'publicKey', e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label>Secret Key</label>
                                <input 
                                  type="password" 
                                  className="form-control" 
                                  placeholder="Flutterwave Secret Key"
                                  value={developerSettings.apiKeys?.payment?.flutterwave?.secretKey || ''}
                                  onChange={(e) => handleApiKeyChange('payment', 'flutterwave', 'secretKey', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mt-3">
                              <h5>Mobile Money</h5>
                              <div className="form-group">
                                <label>API Key</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Mobile Money API Key"
                                  value={developerSettings.apiKeys?.payment?.momo?.apiKey || ''}
                                  onChange={(e) => handleApiKeyChange('payment', 'momo', 'apiKey', e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label>User ID</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Mobile Money User ID"
                                  value={developerSettings.apiKeys?.payment?.momo?.userId || ''}
                                  onChange={(e) => handleApiKeyChange('payment', 'momo', 'userId', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mt-3">
                              <h5>Google Maps</h5>
                              <div className="form-group">
                                <label>API Key</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Google Maps API Key"
                                  value={developerSettings.apiKeys?.maps?.googleMaps?.apiKey || ''}
                                  onChange={(e) => handleApiKeyChange('maps', 'googleMaps', 'apiKey', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Generated APIs Tab */}
                <div className="tab-pane" id="generated-apis">
                  <div className="row clearfix">
                    <div className="col-lg-12">
                      <div className="alert alert-info">
                        <strong>Note:</strong> Generate API keys for external systems to consume your RealEstate platform data.
                        Each API key can have different permissions and access levels.
                      </div>
                      
                      {/* Generate New API Key */}
                      <div className="card">
                        <div className="header bg-cyan">
                          <h2><i className="fa fa-key"></i> <strong>Generate</strong> New API Key</h2>
                        </div>
                        <div className="body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>API Name <span className="text-danger">*</span></label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="E.g., Property Listings API"
                                  value={newApiForm.name}
                                  onChange={(e) => handleNewApiFormChange('name', e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Description</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Brief description of API usage"
                                  value={newApiForm.description}
                                  onChange={(e) => handleNewApiFormChange('description', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <label>Permissions <span className="text-danger">*</span></label>
                              <div className="form-group">
                                <div className="checkbox">
                                  <input 
                                    id="checkbox1" 
                                    type="checkbox" 
                                    checked={newApiForm.permissions.read}
                                    onChange={(e) => handleNewApiFormChange('permissions', ['read', e.target.checked])}
                                  />
                                  <label htmlFor="checkbox1">Read (Access to view data)</label>
                                </div>
                                <div className="checkbox">
                                  <input 
                                    id="checkbox2" 
                                    type="checkbox" 
                                    checked={newApiForm.permissions.write}
                                    onChange={(e) => handleNewApiFormChange('permissions', ['write', e.target.checked])}
                                  />
                                  <label htmlFor="checkbox2">Write (Ability to create and update data)</label>
                                </div>
                                <div className="checkbox">
                                  <input 
                                    id="checkbox3" 
                                    type="checkbox" 
                                    checked={newApiForm.permissions.delete}
                                    onChange={(e) => handleNewApiFormChange('permissions', ['delete', e.target.checked])}
                                  />
                                  <label htmlFor="checkbox3">Delete (Ability to remove data)</label>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={generateApiKey}
                              >
                                Generate API Key
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* API Keys List */}
                      <div className="card">
                        <div className="header">
                          <h2><strong>Generated</strong> API Keys</h2>
                        </div>
                        <div className="body">
                          {developerSettings.generatedApis && developerSettings.generatedApis.length > 0 ? (
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>API Key</th>
                                    <th>Permissions</th>
                                    <th>Created</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {developerSettings.generatedApis.map(api => (
                                    <tr key={api.id}>
                                      <td>
                                        <strong>{api.name}</strong>
                                        {api.description && <div><small className="text-muted">{api.description}</small></div>}
                                      </td>
                                      <td>
                                        <div className="input-group">
                                          <input 
                                            type="text" 
                                            className="form-control" 
                                            value={api.key} 
                                            readOnly 
                                          />
                                          <div className="input-group-append">
                                            <button 
                                              className="btn btn-outline-secondary" 
                                              type="button"
                                              onClick={() => {
                                                navigator.clipboard.writeText(api.key);
                                                toast.success('API key copied to clipboard');
                                              }}
                                            >
                                              <i className="fa fa-copy"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        {api.permissions.map(perm => (
                                          <span key={perm} className="badge badge-primary mr-1">{perm}</span>
                                        ))}
                                      </td>
                                      <td>{new Date(api.createdAt).toLocaleDateString()}</td>
                                      <td>
                                        <span className={`badge ${api.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                                          {api.status}
                                        </span>
                                      </td>
                                      <td>
                                        <button 
                                          className={`btn btn-sm ${api.status === 'active' ? 'btn-warning' : 'btn-success'} mr-1`}
                                          onClick={() => toggleApiStatus(api.id)}
                                        >
                                          {api.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                        <button 
                                          className="btn btn-sm btn-danger"
                                          onClick={() => deleteApi(api.id)}
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="text-center p-3">
                              <p>No API keys have been generated yet.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Webhooks Tab */}
                <div className="tab-pane" id="webhooks">
                  <div className="row clearfix">
                    <div className="col-lg-