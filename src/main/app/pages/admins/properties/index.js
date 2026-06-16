import { useContext, useState } from "react";
import DashboardModal from "../../../../components/admin/DashboardModal";
import AddProperty from "../addProperty";
import Categories from "../../../../components/admin/categories";
import Loader from "../../../../components/loader";
import AgentsTable from "../../../../components/tables/adminProp";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function AdminProperties() {
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
          </div>
        </div>
        <div className="body">
          <Categories />
          {loading ? <Loader /> : <AgentsTable />}
        </div>
      </div>

      {showAddPropertyModal ? (
        <DashboardModal
          title="Add Property"
          onClose={() => setShowAddPropertyModal(false)}
          size="large"
        >
          <AddProperty isModal onClose={() => setShowAddPropertyModal(false)} />
        </DashboardModal>
      ) : null}
    </div>
  );
}
