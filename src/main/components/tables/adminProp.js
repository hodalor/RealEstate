import { useContext } from "react";
import { AdminContext } from "../../libs/contexts/adminContext";

export default function AgentsTable() {
  const { _routeToDetails, adminData } = useContext(AdminContext);
  const properties = adminData.properties;

  return (
    <div className="card table-responsive">
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
                    style={{ width: "70px" }}
                  >
                    Property type
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: "30px" }}
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
                    style={{ width: "200px" }}
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties === undefined || properties.length === 0 ? (
                  <span>No data found</span>
                ) : (
                  properties.map((property, index) => {
                    return (
                      <tr
                        role="row"
                        onClick={() => _routeToDetails(property)}
                        className="odd"
                        key={index}
                      >
                        <td>
                          <img
                            src={property.images.image1}
                            className="w30 rounded mr-2"
                            alt
                          />{" "}
                          {property.name}
                        </td>
                        <td>{property.propType}</td>
                        <td>
                          {property.others.available
                            ? "Available"
                            : "Not Available"}
                        </td>
                        <td>{property.location}</td>
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
