import { useContext } from "react";
import { Link } from "react-router-dom";
import { AgentsContext } from "../../libs/contexts/agentsContext";
import { AuthContext } from "../../libs/contexts/authContext";

export default function AgentsTopBar() {
  const { _logout } = useContext(AuthContext);
  const { agentState } = useContext(AgentsContext);
  const requests = agentState.requests;
  const agent = agentState.agent || {};

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
          <Link className="internal-brand" to="/agents/properties/">
            <span className="internal-brand-badge">
              <i className="fa fa-building" aria-hidden="true"></i>
            </span>
            <span>
              <strong>HodalorEstate</strong>
              <small>Agent workspace</small>
            </span>
          </Link>
        </div>

        <div className="internal-topbar-right">
          <div className="internal-topbar-chip">
            <i className="fa fa-bell" aria-hidden="true"></i>
            <span>{requests.length} requests</span>
          </div>
          <Link to="/agents/profile" className="internal-user-pill">
            <span className="internal-user-avatar">
              {(agent.firstName || "A").slice(0, 1)}
            </span>
            <div>
              <strong>{`${agent.firstName || "Agent"} ${agent.lastName || ""}`.trim()}</strong>
              <small>{agent.role || "Agent"}</small>
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
