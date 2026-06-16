const browserHost =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:8900`
    : "http://localhost:8900";

const rawApiBaseUrl = (process.env.REACT_APP_API_URL || `${browserHost}/api`).replace(/\/$/, "");
const apiBaseUrl = /\/api$/i.test(rawApiBaseUrl)
  ? rawApiBaseUrl
  : `${rawApiBaseUrl}/api`;

const adminUrl = `${apiBaseUrl}/admin/`;
const agentUrl = `${apiBaseUrl}/agent/`;
const uploadUrl = `${apiBaseUrl}/upload/`;
const propertyUrl = `${apiBaseUrl}/properties/`;
const customerUrl = `${apiBaseUrl}/customers/`;
const signUrl = `${apiBaseUrl}/signin/`;
const requestsUrl = `${apiBaseUrl}/requests/`;
const settingsUrl = `${apiBaseUrl}/settings/`;
const toursUrl = `${apiBaseUrl}/tours/`;

export {
  apiBaseUrl,
  adminUrl,
  agentUrl,
  uploadUrl,
  propertyUrl,
  customerUrl,
  signUrl,
  requestsUrl,
  settingsUrl,
  toursUrl,
};
