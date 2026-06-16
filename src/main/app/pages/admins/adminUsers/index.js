import { useContext, useState } from "react";
import DashboardModal from "../../../../components/admin/DashboardModal";
import Loader from "../../../../components/loader";
import AdminAdminsTable from "../../../../components/tables/adminAdmins";
import { AuthContext } from "../../../../libs/contexts/authContext";
import AddAdmin from "../addAdmin";

export default function AdminUsers() {
  const { loading } = useContext(AuthContext);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  return (
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card internal-page-card">
          <div className="internal-page-card-header">
            <h3 className="internal-page-card-title">Admin Users</h3>
            <div className="internal-page-card-actions">
              <button
                type="button"
                className="internal-action-btn"
                onClick={() => setShowAddAdminModal(true)}
              >
                <i className="fa fa-user-plus m-r-5" /> Add Admin
              </button>
            </div>
          </div>
          <div className="body">{loading ? <Loader /> : <AdminAdminsTable />}</div>
        </div>
      </div>

      {showAddAdminModal ? (
        <DashboardModal
          title="Add Admin User"
          onClose={() => setShowAddAdminModal(false)}
          size="large"
        >
          <AddAdmin isModal onClose={() => setShowAddAdminModal(false)} />
        </DashboardModal>
      ) : null}
    </div>
  );
}
