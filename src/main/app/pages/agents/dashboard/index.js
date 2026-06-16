import { useContext } from "react";
import { AgentsContext } from "../../../../libs/contexts/agentsContext";

export default function AgentDashboard() {
  const { agentState } = useContext(AgentsContext);
  const properties = agentState.properties || [];
  const available = properties.filter((property) => property?.others?.available).length;
  const occupied = properties.length - available;
  const requests = agentState.requests || [];

  const summaryCards = [
    { label: "My Properties", value: properties.length, color: "bg-primary" },
    { label: "Available Deals", value: available, color: "bg-success" },
    { label: "Closed / Unavailable", value: occupied, color: "bg-warning" },
    { label: "Client Requests", value: requests.length, color: "bg-info" },
  ];

  return (
    <div className="row clearfix">
      {summaryCards.map((card) => (
        <div className="col-lg-3 col-md-6" key={card.label}>
          <div className={`card text-white ${card.color}`}>
            <div className="body">
              <h3 className="m-b-0">{card.value}</h3>
              <p className="m-b-0">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="col-lg-12">
        <div className="card internal-page-card">
          <div className="body">
            <h4 className="internal-page-card-title">Account Summary</h4>
            <p className="m-t-15 m-b-0">
              This dashboard shows only the summaries related to your listings, customer requests, and active deals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
