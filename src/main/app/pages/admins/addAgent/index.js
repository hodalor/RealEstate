import { useContext } from "react";
import Loader from "../../../../components/loader";
import Notify from "../../../../components/notification";
import ImageUpload from "../../../../components/uploadImage";
import { AdminContext } from "../../../../libs/contexts/adminContext";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function AddAgent(params) {
  const { _handleChange, adminData, _cancelAdd, _createAgent } =
    useContext(AdminContext);
  const { loading } = useContext(AuthContext);
  return (
    <div>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card">
              <Notify />
              <div className="header">
                <h2>
                  <strong>Basic</strong> Information{" "}
                  <small>Description text here...</small>{" "}
                </h2>
              </div>
              <div className="body">
                <div className="row clearfix">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={adminData.user.firstName}
                        onChange={(e) =>
                          _handleChange({
                            field: "firstName",
                            value: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={adminData.user.lastName}
                        onChange={(e) =>
                          _handleChange({
                            field: "lastName",
                            value: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Digital address"
                        value={adminData.user.address}
                        onChange={(e) =>
                          _handleChange({
                            field: "address",
                            value: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Date of Birth"
                        value={adminData.user.dob}
                        onChange={(e) =>
                          _handleChange({
                            field: "dob",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ghana Card No."
                        value={adminData.user.ghcard}
                        onChange={(e) =>
                          _handleChange({
                            field: "ghcard",
                            value: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Guarantor 1 name"
                        value={adminData.user.gr1Name}
                        onChange={(e) =>
                          _handleChange({
                            field: "gr1Name",
                            value: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="telephone"
                        className="form-control"
                        placeholder="Guarantor 1 contact"
                        value={adminData.user.gr1Contact}
                        onChange={(e) =>
                          _handleChange({
                            field: "gr1Contact",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <select
                      className="form-control show-tick"
                      onChange={(e) =>
                        _handleChange({
                          field: "rel1",
                          value: e.target.value.toUpperCase(),
                        })
                      }
                    >
                      <option value>-- Relationship 1 --</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other Family Member">
                        Other Family Member
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Guarantor 2 name"
                        value={adminData.user.gr2Name}
                        onChange={(e) =>
                          _handleChange({
                            field: "gr2Name",
                            value: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="telephone"
                        className="form-control"
                        placeholder="Guarantor 2 contact"
                        value={adminData.user.gr2Contact}
                        onChange={(e) =>
                          _handleChange({
                            field: "gr2Contact",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <select
                      className="form-control show-tick"
                      onChange={(e) =>
                        _handleChange({
                          field: "rel2",
                          value: e.target.value.toUpperCase(),
                        })
                      }
                    >
                      <option value>-- Relationship 2 --</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other Family Member">
                        Other Family Member
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <select
                      className="form-control show-tick"
                      onChange={(e) =>
                        _handleChange({
                          field: "gender",
                          value: e.target.value.toUpperCase(),
                        })
                      }
                    >
                      <option value>-- Gender --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <h6 className="mt-4">Account Information</h6>
                <div className="row clearfix">
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={adminData.user.email}
                        onChange={(e) =>
                          _handleChange({
                            field: "email",
                            value: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="telephone"
                        className="form-control"
                        placeholder="Phone"
                        value={adminData.user.phone}
                        onChange={(e) =>
                          _handleChange({
                            field: "phone",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={adminData.user.password}
                        onChange={(e) =>
                          _handleChange({
                            field: "password",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={adminData.user.con_pass}
                        onChange={(e) =>
                          _handleChange({
                            field: "con_pass",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <h6 className="mt-4">Account Information</h6>
                <div className="row clearfix">
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Facebook"
                        value={adminData.user.fb}
                        onChange={(e) =>
                          _handleChange({
                            field: "fb",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Twitter"
                        value={adminData.user.tw}
                        onChange={(e) =>
                          _handleChange({
                            field: "tw",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Instagram"
                        value={adminData.user.ins}
                        onChange={(e) =>
                          _handleChange({
                            field: "ins",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <form className="form-group">
                      <ImageUpload
                        onUpload={(v) =>
                          _handleChange({
                            field: "image",
                            value: v,
                          })
                        }
                      />
                    </form>
                  </div>
                  <div className="col-sm-12 mt-4">
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary btn-round"
                          onClick={_createAgent}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-round btn-simple"
                          onClick={_cancelAdd}
                        >
                          Cancel
                        </button>
                      </>
                    )}
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
