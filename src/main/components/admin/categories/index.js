import { useContext } from "react";
import { AdminContext } from "../../../libs/contexts/adminContext";

export default function Categories() {
  const { _handleCategory } = useContext(AdminContext);

  return (
    <div className="card">
      <h5 className="mt-3 ml-3">Sort by Category</h5>
      <div className="row mt-3">
        <div className="col-sm-12">
          <div className="form-group inlineblock">
            <input
              // value={"checked"}
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
              onChange={(e) =>
                _handleCategory({ filed: "All", value: e.target.checked })
              }
            />
            <label htmlFor="checkbox21">All</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
              onChange={(e) =>
                _handleCategory({
                  filed: "single-rooms",
                  value: e.target.checked,
                })
              }
            />
            <label htmlFor="checkbox22">Single rooms</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
              onChange={(e) =>
                _handleCategory({
                  filed: "appartment",
                  value: e.target.checked,
                })
              }
            />
            <label htmlFor="checkbox23">Apartments</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
              onChange={(e) =>
                _handleCategory({ filed: "offices", value: e.target.checked })
              }
            />
            <label htmlFor="checkbox24">Offices</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
              onChange={(e) =>
                _handleCategory({ filed: "shops", value: e.target.checked })
              }
            />
            <label htmlFor="checkbox25">Shops</label>
          </div>
          <div className="form-group inlineblock">
            <input
              style={{ width: "20px", height: "20px", margin: "10px" }}
              type="checkbox"
              onChange={(e) =>
                _handleCategory({
                  filed: "full-house",
                  value: e.target.checked,
                })
              }
            />
            <label htmlFor="checkbox29">Full House</label>
          </div>
        </div>
      </div>
    </div>
  );
}
