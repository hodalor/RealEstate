import { useContext } from "react";
import { AdminContext } from "../../libs/contexts/adminContext";

export default function UsersTable() {
  const { _routeToUsers, adminData } = useContext(AdminContext);
  const customers = adminData.customers;

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
                    Phone
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers !== undefined || customers.length !== 0 ? (
                  customers.map((customer, index) => {
                    var imgUrl = customer.image;
                    return (
                      <tr
                        // onClick={() => _routeToUsers(customer)}
                        role="row"
                        className="odd"
                        key={index}
                      >
                        <td>
                          <img
                            src={imgUrl}
                            className="w30 rounded mr-2"
                            alt="cutomer"
                          />{" "}
                          {customer.firstName + " " + customer.lastName}
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.isBlocked ? "Blocked" : "Active"}</td>
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
