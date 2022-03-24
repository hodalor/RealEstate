import { useContext } from "react";
import { Link } from "react-router-dom";
import { BuyersContext } from "../../libs/contexts/buyersContext";

export default function Aside() {
  const {_navigateToAgents} = useContext(BuyersContext)
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
                      <Link to="/properties/profile">
                        <img
                          src="../assets2/images/profile_av.jpg"
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>Michael</h4>
                      <small>user</small>
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/properties/listings">
                    <i className="fa fa-home" />
                    <span>Properties</span>
                  </Link>
                </li>
                <li>
                  <a href="javascript:void(0);" className="menu-toggle">
                    <i className="fa fa-city" />
                    <span>Categories</span>
                  </a>
                  <ul className="ml-menu">
                    <li>
                      <span
                        style={{ marginLeft: "35px", width: "100%" }}
                        type="button"
                        role="button"
                      >
                        All
                      </span>
                    </li>
                    <li>
                      <span
                        style={{ marginLeft: "35px", width: "100%" }}
                        type="button"
                        role="button"
                      >
                        Single Rooms
                      </span>
                    </li>
                    <li>
                      <span
                        style={{ marginLeft: "35px", width: "100%" }}
                        type="button"
                        role="button"
                      >
                        Apartments
                      </span>
                    </li>
                    <li>
                      <span
                        style={{ marginLeft: "35px", width: "100%" }}
                        type="button"
                        role="button"
                      >
                        Offices
                      </span>
                    </li>
                    <li>
                      <span
                        style={{ marginLeft: "35px", width: "100%" }}
                        type="button"
                        role="button"
                      >
                        Shops
                      </span>
                    </li>
                    <li>
                      <span
                        style={{ marginLeft: "35px", width: "100%" }}
                        type="button"
                        role="button"
                      >
                        Villas
                      </span>
                    </li>
                  </ul>
                </li>
                <li role="button" type="button" onClick={_navigateToAgents}>
                  <Link>
                    <i className="fa fa-users" />
                    <span>Agents</span>
                  </Link>
                </li>
                <li>
                  <Link to="/properties/favorites">
                    <i className="fa fa-heart" />
                    <span>favorites</span>
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
                      <Link to="/properties/profile">
                        <img
                          src="../assets2/images/profile_av.jpg"
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>Michael</h4>
                      <small>User</small>
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
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
