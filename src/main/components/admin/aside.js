import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../libs/contexts/adminContext";

export default function AdminAside() {
  const { adminData } = useContext(AdminContext);
  const admin = adminData.admin;

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
                          src={admin !== undefined ? admin.image : ""}
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>{admin.firstName + " " + admin.lastName}</h4>
                      <small>{admin.role}</small>
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
                  <Link to="/admin/add-admin/">
                    <i className="fa fa-user-plus" />
                    <span>Add admin</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users/">
                    <i className="fa fa-users" />
                    <span>Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/notifications">
                    <i className="fa fa-bell" />
                    <span>Notifications</span>
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
                          src={admin !== undefined ? admin.image : ""}
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>{admin.firstName + " " + admin.lastName}</h4>
                      <small>{admin.role}</small>
                    </div>
                    <p className="text-muted">
                      {admin !== undefined ? admin.address : "Address"}
                    </p>
                  </div>
                </li>
                <li>
                  <small className="text-muted">Email address: </small>
                  <p>{admin !== undefined ? admin.email : "Email"}</p>
                  <hr />
                  <small className="text-muted">Phone: </small>
                  <p>{admin !== undefined ? admin.phone : "Phone"}</p>
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
