import FilterComp from "../../../../components/filter";
import AgentsTable from "../../../../components/tables/properties";

export default function AgentsProperties() {
  return (
    <div className="card">
      <div className="card-header">
        <FilterComp />
      </div>
      <div className="card-body">
        <AgentsTable />
      </div>
    </div>
  );
}
