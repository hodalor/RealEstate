import { useContext } from "react";
import Loader from "../../../../components/loader";
import Notify from "../../../../components/notification";
import ImageUpload from "../../../../components/uploadImage";
import { AdminContext } from "../../../../libs/contexts/adminContext";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function AddAdmin(params) {
  const { _handleChange, adminData, _cancelAdd, _submit } =
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
                </div>
                <h6 className="mt-4">Account Information</h6>
                <div className="row clearfix">
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
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
                        type="text"
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
                          onClick={_submit}
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
