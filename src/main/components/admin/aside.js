import { Link } from "react-router-dom";

export default function AdminAside() {
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
                  <div className="user-info">
                    <div className="image">
                      <Link to="/admin/profile/">
                        <img
                          src="../assets2/images/profile_av.jpg"
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>Michael</h4>
                      <small>Admin</small>
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/admin/properties/">
                    <i className="fa fa-home" />
                    <span>Properties</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/create-property">
                    <i className="fa fa-hospital" />
                    <span>Add Property</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/agents/">
                    <i className="fa fa-user" />
                    <span>Agents</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/add-agent/">
                    <i className="fa fa-user-plus" />
                    <span>Add Agent</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users/">
                    <i className="fa fa-users" />
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/agents/notifications">
                    <i className="fa fa-bell" />
                    <span>Notifications</span>
                  </Link>
                </li>
                <li>
                  <Link to="/support">
                    <i className="fa fa-headset" />
                    <span>Support</span>
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
                        <img
                          src="../assets2/images/profile_av.jpg"
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>Michael</h4>
                      <small>Admin</small>
                    </div>
                    <p className="text-muted">
                      795 Folsom Ave, Suite 600 San Francisco, CADGE 94107
                    </p>
                  </div>
                </li>
                <li>
                  <small className="text-muted">Email address: </small>
                  <p>michael@gmail.com</p>
                  <hr />
                  <small className="text-muted">Phone: </small>
                  <p>+ 202-555-0191</p>
                  <hr />
                </li>
                <li>
                  <Link
                    to="/admin/add-admin/"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "10px",
                      marginRight: "10px",
                      color: "white",
                      height: "30px",
                    }}
                    className="btn-sm btn-primary"
                  >
                    Add Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
