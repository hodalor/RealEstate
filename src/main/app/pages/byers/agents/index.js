import AgentsTable from "../../../../components/tables/agents";

export default function Agents() {
  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="body">
              <AgentsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
