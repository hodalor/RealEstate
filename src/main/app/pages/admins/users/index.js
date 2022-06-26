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
          <div className="card">
            <div className="body">{loading ? <Loader /> : <UsersTable />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
