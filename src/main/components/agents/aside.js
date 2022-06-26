import { useContext } from "react";
import { Link } from "react-router-dom";
import { AgentsContext } from "../../libs/contexts/agentsContext";

export default function AgentsAside() {
  const { agentState } = useContext(AgentsContext);
  const agent = agentState.agent;

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
                      <Link to="/agents/profile/">
                        <img
                          src={agent !== undefined ? agent.image : ""}
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>{agent.firstName + " " + agent.lastName}</h4>
                      <small>{agent.role}</small>
                    </div>
                  </div>
                </li>
                <li>
                  <Link to="/agents/properties">
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
                <li>
                  <Link to="/agents/create-property">
                    <i className="fa fa-hospital" />
                    <span>Create Property</span>
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
                      <Link to="/agents/profile">
                        <img
                          src={agent !== undefined ? agent.image : ""}
                          alt="User"
                        />
                      </Link>
                    </div>
                    <div className="detail">
                      <h4>
                        {agent !== undefined
                          ? agent.firstName + " " + agent.lastName
                          : "Name"}
                      </h4>
                      <small>{agent.role}</small>
                    </div>
                    <p className="text-muted">
                      {agent !== undefined ? agent.address : "Address"}
                    </p>
                  </div>
                </li>
                <li>
                  <small className="text-muted">Email address: </small>
                  <p>{agent !== undefined ? agent.email : "Email"}</p>
                  <hr />
                  <small className="text-muted">Phone: </small>
                  <p>{agent !== undefined ? agent.phone : "Phone"}</p>
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
