import React, { useState } from 'react';

export default function DeveloperSettings() {
  const [activeTab, setActiveTab] = useState('api-keys');

  return (
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">
          <div className="header">
            <h2>Developer Settings</h2>
          </div>
          <div className="body">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'api-keys' ? 'active' : ''}`}
                  onClick={() => setActiveTab('api-keys')}
                  href="#api-keys"
                  data-toggle="tab"
                >
                  API Keys
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 'webhooks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('webhooks')}
                  href="#webhooks"
                  data-toggle="tab"
                >
                  Webhooks
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {/* API Keys Tab */}
              <div className={`tab-pane ${activeTab === 'api-keys' ? 'active' : ''}`} id="api-keys">
                <div className="row clearfix">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="header">
                        <h2>API Keys</h2>
                        <button className="btn btn-primary float-right">
                          Generate New Key
                        </button>
                      </div>
                      <div className="body">
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Key Name</th>
                                <th>API Key</th>
                                <th>Created</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan="4" className="text-center">
                                  No API keys have been generated yet.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Webhooks Tab */}
              <div className={`tab-pane ${activeTab === 'webhooks' ? 'active' : ''}`} id="webhooks">
                <div className="row clearfix">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="header">
                        <h2>Webhooks</h2>
                        <button className="btn btn-primary float-right">
                          Add New Webhook
                        </button>
                      </div>
                      <div className="body">
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Endpoint URL</th>
                                <th>Events</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan="4" className="text-center">
                                  No webhooks configured yet
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}