import { useContext } from "react";
import { AdminContext } from "../../libs/contexts/adminContext";
import DashboardSidebar from "../dashboardSidebar";

export default function AdminAside() {
  const { adminData } = useContext(AdminContext);
  const admin = adminData.admin || {};
  const adminAuthorizations = admin.authorizations || [];
  const canAccess = (key) =>
    adminAuthorizations.length === 0 || adminAuthorizations.includes(key);

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: "fa fa-dashboard", to: "/admin/dashboard/" },
    canAccess("properties")
      ? { key: "properties", label: "Properties", icon: "fa fa-home", to: "/admin/properties/" }
      : null,
    canAccess("agents")
      ? { key: "agents", label: "Agents", icon: "fa fa-user", to: "/admin/agents/" }
      : null,
    canAccess("customers")
      ? { key: "customers", label: "Customers", icon: "fa fa-users", to: "/admin/users/" }
      : null,
    canAccess("admins")
      ? {
          key: "admins",
          label: "Admin Users",
          icon: "fa fa-shield",
          to: "/admin/admin-users/",
        }
      : null,
    { key: "chats", label: "Live Chat", icon: "fa fa-comments", to: "/admin/chats" },
    { key: "tours", label: "Tour Bookings", icon: "fa fa-calendar", to: "/admin/tour-bookings" },
    canAccess("payments")
      ? {
          key: "payments",
          label: "Payment History",
          icon: "fa fa-money",
          to: "/admin/payments",
        }
      : null,
    { key: "notifications", label: "Notifications", icon: "fa fa-bell", to: "/admin/notifications" },
    canAccess("settings")
      ? { key: "settings", label: "Settings", icon: "fa fa-cog", to: "/admin/settings" }
      : null,
  ].filter(Boolean);

  return (
    <DashboardSidebar
      items={menuItems}
      user={admin}
      profileRoute="/admin/profile/"
      defaultRole="Administrator"
    />
  );
}
