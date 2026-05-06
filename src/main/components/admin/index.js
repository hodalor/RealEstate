import AdminAside from "./aside";
import AdminTopBar from "./topBar";
import DashboardAssets from "../dashboardAssets";

export default function AdminStart() {
  return (
    <div>
      <DashboardAssets />
      <AdminTopBar />
      <AdminAside />
    </div>
  );
}
