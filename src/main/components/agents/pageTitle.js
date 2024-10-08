import { useContext } from "react";
import { AgentsContext } from "../../libs/contexts/agentsContext";

export default function AgentsPageTitle() {
  const { _routeToAdd } = useContext(AgentsContext);
  return (
    <div className="block-header">
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h2>
            Agents
            <small>Welcome to HodalorEstate</small>
          </h2>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12">
          <button
            class="btn btn-white btn-icon btn-round hidden-sm-down float-right ml-3"
            type="button"
            onClick={_routeToAdd}
            title="add property"
          >
            <i class="fa fa-plus"></i>
          </button>
          <ul className="breadcrumb float-md-right">
            <li className="breadcrumb-item">
              <span>
                <i className="fa fa-home" /> HodalorEstate
              </span>
            </li>
            <li className="breadcrumb-item">
              <span>Agents Page</span>
            </li>
            <li className="breadcrumb-item active">Properties</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
