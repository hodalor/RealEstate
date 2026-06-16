import { useContext } from "react";
import Loader from "../../../../components/loader";
import Notify from "../../../../components/notification";
import ImageUpload from "../../../../components/uploadImage";
import { AdminContext } from "../../../../libs/contexts/adminContext";
import { AuthContext } from "../../../../libs/contexts/authContext";

const authorizationOptions = [
  "dashboard",
  "properties",
  "agents",
  "customers",
  "admins",
  "payments",
  "settings",
];

export default function AddAdmin({ isModal = false, onClose }) {
  const { _handleChange, adminData, _cancelAdd, _submit } =
    useContext(AdminContext);
  const { loading } = useContext(AuthContext);
  const handleSubmit = async () => {
    const created = await _submit();

    if (created && onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    _cancelAdd();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={isModal ? "" : "internal-form-page"}>
      <div className={isModal ? "" : "container-fluid"}>
        <div className={isModal ? "" : "row clearfix"}>
          <div className={isModal ? "" : "col-lg-12"}>
            <div className={`${isModal ? "" : "card "}internal-form-shell`}>
              <Notify />
              <div className="header internal-form-header">
                <h2>
                  <strong>Create</strong> Admin
                  <small>Set up admin identity, credentials, and profile image.</small>
                </h2>
              </div>
              <div className="body internal-form-body">
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
                <h6 className="internal-section-label">Account Information</h6>
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
                <h6 className="internal-section-label">Authorizations</h6>
                <div className="row clearfix">
                  {authorizationOptions.map((permission) => (
                    <div className="col-md-4 col-sm-6" key={permission}>
                      <label className="d-flex align-items-center" style={{ gap: "10px" }}>
                        <input
                          type="checkbox"
                          checked={(adminData.user.authorizations || []).includes(permission)}
                          onChange={() =>
                            _handleChange({
                              field: "authorizations",
                              value: permission,
                            })
                          }
                        />
                        <span style={{ textTransform: "capitalize" }}>{permission}</span>
                      </label>
                    </div>
                  ))}
                </div>
                <h6 className="internal-section-label">Profile Image</h6>
                <div className="row clearfix">
                  <div className="col-sm-12">
                    <form className="form-group internal-upload-block">
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
                          className="btn btn-primary btn-round internal-primary-btn"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-default btn-round btn-simple internal-secondary-btn"
                          onClick={handleClose}
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
