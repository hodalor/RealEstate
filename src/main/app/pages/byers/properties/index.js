import { useContext } from "react";
import FilterComp from "../../../../components/filter";
import ItemComp from "../../../../components/buyers/item";
import Loader from "../../../../components/loaderComp";
import { BuyersContext } from "../../../../libs/contexts/buyersContext";

export default function Properties() {
  const { buyerState } = useContext(BuyersContext);
  const loading = buyerState.loading;
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
