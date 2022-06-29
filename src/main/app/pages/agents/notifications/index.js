import { useContext } from "react";
import Loader from "../../../../components/loader";
import NotificationsTable from "../../../../components/tables/notifications";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function Notifications() {
  const { loading } = useContext(AuthContext);

  return (
    <div className="card">{loading ? <Loader /> : <NotificationsTable />}</div>
  );
}
