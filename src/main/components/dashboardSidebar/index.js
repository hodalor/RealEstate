import { Link } from "react-router-dom";

function MenuItem({ item }) {
  if (item.children && item.children.length > 0) {
    return (
      <li>
        <button type="button" className="menu-toggle">
          <i className={item.icon} />
          <span>{item.label}</span>
        </button>
        <ul className="ml-menu">
          {item.children.map((child) => (
            <li key={child.to}>
              <Link to={child.to}>
                <span>{child.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  if (item.onClick) {
    return (
      <li>
        <button type="button" className="menu-toggle" onClick={item.onClick}>
          <i className={item.icon} />
          <span>{item.label}</span>
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link to={item.to}>
        <i className={item.icon} />
        <span>{item.label}</span>
      </Link>
    </li>
  );
}

export default function DashboardSidebar({
  items = [],
  user = {},
  profileRoute,
  defaultRole = "User",
}) {
  const userImage = user.image || "/assets/image/user.jpg";
  const userName = [user.firstName, user.lastName].filter(Boolean).join(" ") || defaultRole;
  const userRole = user.role || defaultRole;
  const userAddress = user.address || "Address";
  const userEmail = user.email || "Email";
  const userPhone = user.phone || "Phone";

  return (
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
              {items.map((item) => (
                <MenuItem key={item.key || item.label} item={item} />
              ))}
            </ul>
          </div>
        </div>
        <div className="tab-pane stretchLeft" id="user">
          <div className="menu">
            <ul className="list">
              <li>
                <div className="user-info m-b-20 p-b-15">
                  <div className="image">
                    <Link to={profileRoute}>
                      <img src={userImage} alt="User" />
                    </Link>
                  </div>
                  <div className="detail">
                    <h4>{userName}</h4>
                    <small>{userRole}</small>
                  </div>
                  <p className="text-muted">{userAddress}</p>
                </div>
              </li>
              <li>
                <small className="text-muted">Email address: </small>
                <p>{userEmail}</p>
                <hr />
                <small className="text-muted">Phone: </small>
                <p>{userPhone}</p>
                <hr />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
