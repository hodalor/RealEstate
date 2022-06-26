import { useContext } from "react";
import { AgentsContext } from "../../libs/contexts/agentsContext";

export default function AgentsTable() {
  const { _routeToDetails, agentState } = useContext(AgentsContext);

  const properties = agentState.properties;

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
                    Property Name
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Email: activate to sort column ascending"
                    style={{ width: "80px" }}
                  >
                    Price
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Email: activate to sort column ascending"
                    style={{ width: "80px" }}
                  >
                    Rent / Sale
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: "85.4375px" }}
                  >
                    Status
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Deal: activate to sort column ascending"
                    style={{ width: "185px" }}
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties !== undefined || properties.length !== 0 ? (
                  properties.map((property, index) => {
                    const image = property.images.image1;
                    return (
                      <tr
                        role="row"
                        onClick={() => _routeToDetails(property)}
                        className="odd"
                        key={index}
                      >
                        <td>
                          <img
                            src={image}
                            className="w30 rounded mr-2"
                            alt="property"
                          />{" "}
                          {property.name}
                        </td>
                        <td>{property.price}</td>
                        <td>{property.rentOrSale}</td>
                        <td>{property.isApproved ? "Approved" : "Pending"}</td>
                        <td>{property.location}</td>
                      </tr>
                    );
                  })
                ) : (
                  <span>No data found</span>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
