
import { useLocation } from "react-router-dom";

export default function AdminPageTitle() {
  const location = useLocation();
  const activePage = (() => {
    if (location.pathname.includes("/dashboard")) return "Dashboard";
    if (location.pathname.includes("/admin-users")) return "Admin Users";
    if (location.pathname.includes("/users")) return "Customers";
    if (location.pathname.includes("/agents")) return "Agents";
    if (location.pathname.includes("/payments")) return "Payments";
    if (location.pathname.includes("/settings")) return "Settings";
    if (location.pathname.includes("/notifications")) return "Notifications";
    return "Properties";
  })();

  return (
    <div className="block-header">
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h2>
            Admin
            <small>Welcome to LEDS PROPERTIES</small>
          </h2>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12">
          <ul className="breadcrumb float-md-right">
            <li className="breadcrumb-item">
              <span>
                <i className="fa fa-home" /> LEDS PROPERTIES
              </span>
            </li>
            <li className="breadcrumb-item">
              <span>Admin Page</span>
            </li>
            <li className="breadcrumb-item active">{activePage}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
