import { useLocation } from "react-router-dom";

export default function AgentsPageTitle() {
  const location = useLocation();
  const activePage = (() => {
    if (location.pathname.includes("/dashboard")) return "Dashboard";
    if (location.pathname.includes("/payment-history")) return "Payments";
    if (location.pathname.includes("/tour-bookings")) return "Tour Bookings";
    if (location.pathname.includes("/notifications")) return "Notifications";
    if (location.pathname.includes("/profile")) return "Profile";
    return "Properties";
  })();

  return (
    <div className="block-header">
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h2>
            Agents
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
              <span>Agents Page</span>
            </li>
            <li className="breadcrumb-item active">{activePage}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
