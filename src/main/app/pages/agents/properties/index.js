import { useContext } from "react";
import FilterComp from "../../../../components/filter";
import Loader from "../../../../components/loader";
import AgentsTable from "../../../../components/tables/properties";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function AgentsProperties() {
  const { loading } = useContext(AuthContext);
  
  return (
    <div className="card">
      <div className="card-header">
        <FilterComp />
      </div>
      <div className="card-body">{loading ? <Loader /> : <AgentsTable />}</div>
    </div>
  );
}
