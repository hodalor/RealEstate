import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../libs/contexts/authContext";
import { AdminContext } from "../../libs/contexts/adminContext";

export default function AdminTopBar() {
  const { _logout } = useContext(AuthContext);
  const { adminData } = useContext(AdminContext);
  const pending = adminData.pending;
  const admin = adminData.admin || {};

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
          <Link className="internal-brand" to="/admin/dashboard/">
            <span className="internal-brand-badge">
              <i className="fa fa-building" aria-hidden="true"></i>
            </span>
            <span>
              <strong>HodalorEstate</strong>
              <small>Admin dashboard</small>
            </span>
          </Link>
        </div>

        <div className="internal-topbar-right">
          <div className="internal-topbar-chip">
            <i className="fa fa-bell" aria-hidden="true"></i>
            <span>{pending.length} pending</span>
          </div>
          <div className="internal-user-pill">
            <span className="internal-user-avatar">
              {(admin.firstName || "A").slice(0, 1)}
            </span>
            <div>
              <strong>{`${admin.firstName || "Admin"} ${admin.lastName || ""}`.trim()}</strong>
              <small>{admin.role || "Admin"}</small>
            </div>
          </div>
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
