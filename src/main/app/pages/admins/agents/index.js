import { useContext } from "react";
import Loader from "../../../../components/loader";
import AgentsTable from "../../../../components/tables/adminAgents";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function Agents() {
  const { loading } = useContext(AuthContext);
  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="body">{loading ? <Loader /> : <AgentsTable />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
