import { useContext, useState } from "react";
import DashboardModal from "../../../../components/admin/DashboardModal";
import Loader from "../../../../components/loader";
import AgentsTable from "../../../../components/tables/adminAgents";
import { AuthContext } from "../../../../libs/contexts/authContext";
import AddAgent from "../addAgent";

export default function Agents() {
  const { loading } = useContext(AuthContext);
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);

  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card internal-page-card">
            <div className="internal-page-card-header">
              <h3 className="internal-page-card-title">Agents</h3>
              <div className="internal-page-card-actions">
                <button
                  type="button"
                  className="internal-action-btn"
                  onClick={() => setShowAddAgentModal(true)}
                >
                  <i className="fa fa-user-plus m-r-5" /> Add Agent
                </button>
              </div>
            </div>
            <div className="body">{loading ? <Loader /> : <AgentsTable />}</div>
          </div>
        </div>
      </div>

      {showAddAgentModal ? (
        <DashboardModal
          title="Add Agent"
          onClose={() => setShowAddAgentModal(false)}
          size="large"
        >
          <AddAgent isModal onClose={() => setShowAddAgentModal(false)} />
        </DashboardModal>
      ) : null}
    </div>
  );
}
