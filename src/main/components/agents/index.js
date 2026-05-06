import AgentsAside from "./aside";
import AgentsTopBar from "./topBar";
import DashboardAssets from "../dashboardAssets";

export default function AgentsStart() {
  return (
    <div>
      <DashboardAssets />
      <AgentsTopBar />
      <AgentsAside />
    </div>
  );
}
