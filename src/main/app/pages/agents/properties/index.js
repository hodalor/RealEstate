import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DashboardModal from "../../../../components/admin/DashboardModal";
import AddProperty from "../addProperty";
import Loader from "../../../../components/loader";
import AgentsTable from "../../../../components/tables/properties";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function AgentsProperties() {
  const { loading } = useContext(AuthContext);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);

  return (
    <div>
      <div className="card internal-page-card">
        <div className="internal-page-card-header">
          <div>
            <h3 className="internal-page-card-title">Properties</h3>
          </div>
          <div className="internal-page-card-actions">
            <button
              type="button"
              className="internal-action-btn"
              onClick={() => setShowAddPropertyModal(true)}
            >
              <i className="fa fa-plus m-r-5" /> Add Property
            </button>
            <Link to="/agents/create-property" className="internal-action-btn">
              <i className="fa fa-external-link m-r-5" /> Full Form
            </Link>
          </div>
        </div>
        <div className="body">{loading ? <Loader /> : <AgentsTable />}</div>
      </div>

      {showAddPropertyModal ? (
        <DashboardModal
          title="Add Property"
          onClose={() => setShowAddPropertyModal(false)}
          size="large"
        >
          <AddProperty />
        </DashboardModal>
      ) : null}
    </div>
  );
}
