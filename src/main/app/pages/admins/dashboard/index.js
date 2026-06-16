import { useContext } from "react";
import { AdminContext } from "../../../../libs/contexts/adminContext";

export default function AdminDashboard() {
  const { adminData } = useContext(AdminContext);
  const summaryCards = [
    { label: "Total Properties", value: adminData.properties.length, color: "bg-primary" },
    { label: "Pending Approvals", value: adminData.pending.length, color: "bg-warning" },
    { label: "Agents", value: adminData.agents.length, color: "bg-info" },
    { label: "Customers", value: adminData.customers.length, color: "bg-success" },
    { label: "Admin Users", value: adminData.admins.length, color: "bg-secondary" },
  ];

  return (
    <div className="row clearfix">
      {summaryCards.map((card) => (
        <div className="col-lg-4 col-md-6" key={card.label}>
          <div className={`card text-white ${card.color}`}>
            <div className="body">
              <h3 className="m-b-0">{card.value}</h3>
              <p className="m-b-0">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="col-lg-8">
        <div className="card internal-page-card">
          <div className="body">
            <h4 className="internal-page-card-title">Operational Summary</h4>
            <p className="m-t-15 m-b-10">
              Admins oversee properties, customers, agents, approvals, and platform setup from one place.
            </p>
            <p className="m-b-0">
              Use this dashboard as the landing page after login, then move into Properties, Customers, Admins,
              Payments, and Settings as needed.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card internal-page-card">
          <div className="body">
            <h4 className="internal-page-card-title">Quick Stats</h4>
            <ul className="list-unstyled m-t-20 m-b-0">
              <li className="m-b-10">Approved listings: {adminData.properties.length}</li>
              <li className="m-b-10">Pending listings: {adminData.pending.length}</li>
              <li className="m-b-10">Active customers: {adminData.customers.length}</li>
              <li>Platform admins: {adminData.admins.length}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
