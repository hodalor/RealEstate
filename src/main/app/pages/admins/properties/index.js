import { useContext, useEffect } from "react";
import Categories from "../../../../components/admin/categories";
import Loader from "../../../../components/loader";
import AgentsTable from "../../../../components/tables/adminProp";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function AdminProperties() {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      <Categories />
      {loading ? <Loader /> : <AgentsTable />}
    </div>
  );
}
