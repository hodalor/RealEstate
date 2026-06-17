import { useContext } from "react";
import { BuyersContext } from "../../libs/contexts/buyersContext";
import DashboardSidebar from "../dashboardSidebar";

export default function Aside() {
  const { _navigateToAgents, buyerState } = useContext(BuyersContext);
  const buyer = buyerState.buyer || {};
  const menuItems = [
    { key: "properties", label: "Properties", icon: "fa fa-home", to: "/properties/listings" },
    {
      key: "agents",
      label: "Agents",
      icon: "fa fa-users",
      onClick: _navigateToAgents,
    },
  ];

  return (
    <DashboardSidebar
      items={menuItems}
      user={buyer}
      profileRoute="/properties/profile"
      defaultRole="Customer"
    />
  );
}
