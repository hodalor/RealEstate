import { useContext } from "react";
import { AgentsContext } from "../../libs/contexts/agentsContext";

export default function NotificationsTable() {
  const { _routeToNotification, agentState } = useContext(AgentsContext);
  const requests = agentState.requests;

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
                    Sender Name
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
                    Sender Contact
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: "85.4375px" }}
                  >
                    Property Name
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: "85.4375px" }}
                  >
                    Property Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests === undefined || requests.length === 0 ? (
                  <span>No requests made</span>
                ) : (
                  requests.map((request, index) => {
                    return (
                      <tr
                        onClick={() => _routeToNotification(request)}
                        role="row"
                        className="odd"
                        key={index}
                      >
                        <td>{request.userName}</td>
                        <td>{request.userContact}</td>
                        <td>{request.property.propName}</td>
                        <td>{request.property.propLocation}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
