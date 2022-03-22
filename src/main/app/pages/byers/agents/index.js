export default function Agents() {
  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="body">
              <div className="table-responsive">
                <div
                  id="DataTables_Table_0_wrapper"
                  className="dataTables_wrapper dt-bootstrap4 no-footer"
                >
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div
                        className="dataTables_length"
                        id="DataTables_Table_0_length"
                      >
                        <label>
                          Show{" "}
                          <select
                            name="DataTables_Table_0_length"
                            aria-controls="DataTables_Table_0"
                            className="form-control form-control-sm"
                          >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </select>{" "}
                          entries
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div
                        id="DataTables_Table_0_filter"
                        className="dataTables_filter"
                      >
                        <label>
                          Search:
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            placeholder
                            aria-controls="DataTables_Table_0"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
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
                              className="sorting_asc"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-sort="ascending"
                              aria-label="#: activate to sort column descending"
                              style={{ width: "9.48438px" }}
                            >
                              #
                            </th>
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
                              aria-label="Mobile: activate to sort column ascending"
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
                              aria-label="Rating: activate to sort column ascending"
                              style={{ width: "67.6719px" }}
                            >
                              Rating
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
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Value: activate to sort column ascending"
                              style={{ width: "46.75px" }}
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr role="row" className="odd">
                            <td className="sorting_1">1</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar1.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Karen Eilla Boyette
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-4194</td>
                            <td>Manchester</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>53</td>
                            <td>$2,800</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">2</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar2.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Walter Devid Moye
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-1245</td>
                            <td>Chicago</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>51</td>
                            <td>$25,800</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">3</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar3.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Linda Dina Pate
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-2583</td>
                            <td>Manchester</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>201</td>
                            <td>$320,800</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">4</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar4.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Karen Eilla Boyette
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-4578</td>
                            <td>Manchester</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>53</td>
                            <td>$21,800</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">5</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar5.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Walter Devid Moye
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-5689</td>
                            <td>New Jersy</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>108</td>
                            <td>$65,800</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">6</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar6.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Linda Dina Pate
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-7485</td>
                            <td>Manchester</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>250</td>
                            <td>$651,800</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">7</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar7.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Karen Eilla Boyette
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-4194</td>
                            <td>Manchester</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>53</td>
                            <td>$2,800</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">8</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar8.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Walter Devid Moye
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-1245</td>
                            <td>New Delhi</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>51</td>
                            <td>$25,800</td>
                          </tr>
                          <tr role="row" className="odd">
                            <td className="sorting_1">9</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar9.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Linda Dina Pate
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-2583</td>
                            <td>New York</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>185</td>
                            <td>$52,800</td>
                          </tr>
                          <tr role="row" className="even">
                            <td className="sorting_1">10</td>
                            <td>
                              <img
                                src="../assets/images/xs/avatar4.jpg"
                                className="w30 rounded mr-2"
                                alt
                              />{" "}
                              Karen Eilla Boyette
                            </td>
                            <td>areneboyette@armyspy.com</td>
                            <td>+502-324-5263</td>
                            <td>Los Angles</td>
                            <td className="text-warning">
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                              <i className="zmdi zmdi-star" />
                            </td>
                            <td>53</td>
                            <td>$21,800</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div
                        className="dataTables_info"
                        id="DataTables_Table_0_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 1 to 10 of 12 entries
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="DataTables_Table_0_paginate"
                      >
                        <ul className="pagination">
                          <li
                            className="paginate_button page-item previous disabled"
                            id="DataTables_Table_0_previous"
                          >
                            <a
                              href="#"
                              aria-controls="DataTables_Table_0"
                              data-dt-idx={0}
                              tabIndex={0}
                              className="page-link"
                            >
                              Previous
                            </a>
                          </li>
                          <li className="paginate_button page-item active">
                            <a
                              href="#"
                              aria-controls="DataTables_Table_0"
                              data-dt-idx={1}
                              tabIndex={0}
                              className="page-link"
                            >
                              1
                            </a>
                          </li>
                          <li className="paginate_button page-item ">
                            <a
                              href="#"
                              aria-controls="DataTables_Table_0"
                              data-dt-idx={2}
                              tabIndex={0}
                              className="page-link"
                            >
                              2
                            </a>
                          </li>
                          <li
                            className="paginate_button page-item next"
                            id="DataTables_Table_0_next"
                          >
                            <a
                              href="#"
                              aria-controls="DataTables_Table_0"
                              data-dt-idx={3}
                              tabIndex={0}
                              className="page-link"
                            >
                              Next
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
