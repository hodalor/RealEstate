import { useContext } from "react";
import FilterComp from "../../../../components/filter";
import ItemComp from "../../../../components/buyers/item";
import Loader from "../../../../components/loaderComp";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function Properties() {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <FilterComp />
          <ItemComp />
        </div>
      )}
    </div>
  );
}
