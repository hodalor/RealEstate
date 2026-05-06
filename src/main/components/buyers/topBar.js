import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../libs/contexts/authContext";
import { BuyersContext } from "../../libs/contexts/buyersContext";

export default function TopBar() {
  const { _logout } = useContext(AuthContext);
  const { buyerState } = useContext(BuyersContext);
  const buyer = buyerState.buyer || {};

  return (
    <div className="internal-dashboard-shell">
      <div className="overlay" />
      <nav className="navbar p-l-5 p-r-5 internal-dashboard-topbar">
        <div className="internal-topbar-left">
          <button type="button" className="bars internal-icon-btn" aria-label="Open menu" />
          <button
            type="button"
            className="ls-toggle-btn internal-icon-btn"
            data-close="true"
            aria-label="Toggle sidebar"
          >
            <i className="fa fa-bars" />
          </button>
          <Link className="internal-brand" to="/properties/listings">
            <span className="internal-brand-badge">
              <i className="fa fa-building" aria-hidden="true"></i>
            </span>
            <span>
              <strong>HodalorEstate</strong>
              <small>Buyer portal</small>
            </span>
          </Link>
        </div>

        <div className="internal-topbar-right">
          <Link to="/properties/listings" className="internal-topbar-chip">
            <i className="fa fa-search" aria-hidden="true"></i>
            <span>Browse listings</span>
          </Link>
          <Link to="/properties/profile" className="internal-user-pill">
            <span className="internal-user-avatar">
              {(buyer.firstName || "B").slice(0, 1)}
            </span>
            <div>
              <strong>{`${buyer.firstName || "Buyer"} ${buyer.lastName || ""}`.trim()}</strong>
              <small>{buyer.role || "Buyer"}</small>
            </div>
          </Link>
          <button
            type="button"
            className="internal-logout-btn"
            title="Log out"
            onClick={_logout}
          >
            <i className="fa fa-power-off" aria-hidden="true"></i>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
