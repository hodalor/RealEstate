import { useContext } from "react";
import { BuyersContext } from "../../libs/contexts/buyersContext";

export default function AgentsTable() {
  const { _routeToAgents } = useContext(BuyersContext);
  return (
    <div className="table-responsive">
      <div
        id="DataTables_Table_0_wrapper"
        className="dataTables_wrapper dt-bootstrap4 no-footer"
      >
        <div className="row">
          <div className="col-sm-12">
            <table
              className="table td_2 table-striped table-hover js-basic-example dataTable vcenter no-footer"
              id="DataTables_Table_0"
              role="grid"
              aria-describedby="DataTables_Table_0_info"
            >
              <thead>
                <tr role="row">
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Name: activate to sort column ascending"
                    style={{ width: "157.516px" }}
                  >
                    Name
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Email: activate to sort column ascending"
                    style={{ width: "185.047px" }}
                  >
                    Email
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: "85.4375px" }}
                  >
                    Mobile
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="City: activate to sort column ascending"
                    style={{ width: "66.0156px" }}
                  >
                    City
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Deal: activate to sort column ascending"
                    style={{ width: "37.0781px" }}
                  >
                    Deal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={_routeToAgents} role="row" className="odd">
                  <td>
                    <img
                      src="../../assets2/images/xs/avatar1.jpg"
                      className="w30 rounded mr-2"
                      alt
                    />{" "}
                    Karen Eilla Boyette
                  </td>
                  <td>areneboyette@armyspy.com</td>
                  <td>+502-324-4194</td>
                  <td>Manchester</td>
                  <td>53</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
