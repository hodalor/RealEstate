import { useContext } from "react";
import Loader from "../../../../components/loader";
import UsersTable from "../../../../components/tables/users";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function Users() {
  const { loading } = useContext(AuthContext);
  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card internal-page-card">
            <div className="internal-page-card-header">
              <div>
                <h3 className="internal-page-card-title">Customers</h3>
                <small className="text-muted">Normal registered user accounts</small>
              </div>
            </div>
            <div className="body">{loading ? <Loader /> : <UsersTable />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
