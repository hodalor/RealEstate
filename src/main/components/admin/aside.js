import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../libs/contexts/adminContext";

export default function AdminAside() {
  const { adminData } = useContext(AdminContext);
  const admin = adminData.admin || {};
  const adminImage = admin.image || "/assets/image/user.jpg";
  const adminName = [admin.firstName, admin.lastName].filter(Boolean).join(" ") || "Admin";
  const adminRole = admin.role || "Administrator";
  const adminAddress = admin.address || "Address";
  const adminEmail = admin.email || "Email";
  const adminPhone = admin.phone || "Phone";

  return (
    <div>
      <aside id="leftsidebar" className="sidebar">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#dashboard">
              <i className="fa fa-home m-r-5" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#user">
              <i className="fa fa-user m-r-5" />
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane stretchRight active" id="dashboard">
            <div className="menu">
              <ul className="list">
                <li>
                  <Link to="/admin/dashboard/">
                    <i className="fa fa-dashboard" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/properties/">
                    <i className="fa fa-home" />
                    <span>Properties</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/agents/">
                    <i className="fa fa-user" />
                    <span>Agents</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users/">
                    <i className="fa fa-users" />
                    <span>Customers</span>
                  </Link>
                </li>
                <li>
                  <button type="button" className="menu-toggle">
                    <i className="fa fa-shield" />
                    <span>Admins</span>
                  </button>
                  <ul className="ml-menu">
                    <li>
                      <Link to="/admin/admin-users/">
                        <span>Admin Users</span>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/admin/chats">
                    <i className="fa fa-comments" />
                    <span>Live Chat</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/tour-bookings">
                    <i className="fa fa-calendar" />
                    <span>Tour Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/payments">
                    <i className="fa fa-money" />
                    <span>Payment History</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/notifications">
                    <i className="fa fa-bell" />
                    <span>Notifications</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/settings">
                    <i className="fa fa-cog" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-pane stretchLeft" id="user">
            <div className="menu">
              <ul className="list">
                <li>
                  <div className="user-info m-b-20 p-b-15">
                    <div className="image">
                      <Link to="/admin/profile/">
                        <img src={adminImage} alt="User" />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>{adminName}</h4>
                      <small>{adminRole}</small>
                    </div>
                    <p className="text-muted">{adminAddress}</p>
                  </div>
                </li>
                <li>
                  <small className="text-muted">Email address: </small>
                  <p>{adminEmail}</p>
                  <hr />
                  <small className="text-muted">Phone: </small>
                  <p>{adminPhone}</p>
                  <hr />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
