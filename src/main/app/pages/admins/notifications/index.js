import { useContext } from "react";
import Loader from "../../../../components/loader";
import AdminNoti from "../../../../components/tables/adminNoti";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function Notifications() {
  const { loading } = useContext(AuthContext);

  return <div className="card">{loading ? <Loader /> : <AdminNoti />}</div>;
}
