import { useContext } from "react";
import { AgentsContext } from "../../libs/contexts/agentsContext";
import DashboardSidebar from "../dashboardSidebar";

export default function AgentsAside() {
  const { agentState } = useContext(AgentsContext);
  const agent = agentState.agent || {};
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fa fa-dashboard", to: "/agents/dashboard/" },
    { key: "properties", label: "Properties", icon: "fa fa-home", to: "/agents/properties/" },
    { key: "notifications", label: "Notifications", icon: "fa fa-bell", to: "/agents/notifications" },
    { key: "chat", label: "Live Chat", icon: "fa fa-comments", to: "/agents/live-chat" },
    { key: "tours", label: "Tour Bookings", icon: "fa fa-calendar", to: "/agents/tour-bookings" },
    {
      key: "payments",
      label: "Payment History",
      icon: "fa fa-money",
      to: "/agents/payment-history",
    },
  ];

  return (
    <DashboardSidebar
      items={menuItems}
      user={agent}
      profileRoute="/agents/profile"
      defaultRole="Agent"
    />
  );
}
