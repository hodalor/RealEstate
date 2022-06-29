import { useContext } from "react";
import Loader from "../../../../components/loader";
import Notify from "../../../../components/notification";
import ImageUpload from "../../../../components/uploadImage";
import { AuthContext } from "../../../../libs/contexts/authContext";
import { BuyersContext } from "../../../../libs/contexts/buyersContext";

export default function Profile(props) {
  const { buyerState, _changePass, _saveChanges, _handleChange } =
    useContext(BuyersContext);
  const { loading } = useContext(AuthContext);
  const buyer = buyerState.buyer;

  return (
    <div>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-xl-6 col-lg-7 col-md-12">
            <div className="card profile-header">
              <div className="body">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-12">
                    <div className="profile-image float-md-right">
                      {" "}
                      {buyer.image === "" ? (
                        <span>No image uploaded</span>
                      ) : (
                        <img src={buyer.image} alt="buyer" />
                      )}
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-12">
                    <h4 className="m-t-0 m-b-0">
                      <strong>{buyer.firstName}</strong> {buyer.lastName}
                    </h4>
                    <span className="job_post">{buyer.role}</span>
                    <p>{buyer.address}</p>
                    <span
                      style={{
                        color: buyer.isBlocked ? "red" : "blue",
                        fontWeight: "bold",
                      }}
                    >
                      {buyer.isBlocked ? "BLOCKED" : "ACTIVE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-4 col-md-12">
            <div className="card">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <span className="nav-link active" data-toggle="tab">
                    About
                  </span>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane body active" id="about">
                  <small className="text-muted">Email address: </small>
                  <p>{buyer.email}</p>
                  <hr />
                  <small className="text-muted">Phone: </small>
                  <p>{buyer.phone}</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="card">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <span className="nav-link active" data-toggle="tab">
                    Setting
                  </span>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div
                role="tabpanel"
                className="tab-pane active"
                id="usersettings"
              >
                <div className="card">
                  <div className="header">
                    <h2>
                      <strong>Security</strong> Settings
                    </h2>
                  </div>
                  <Notify />
                  <div className="body">
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Current password"
                        value={buyerState.user.password}
                        onChange={(e) =>
                          _handleChange({
                            field: "password",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        value={buyerState.user.new_pass}
                        onChange={(e) =>
                          _handleChange({
                            field: "new_pass",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm new Password"
                        value={buyerState.user.con_pass}
                        onChange={(e) =>
                          _handleChange({
                            field: "con_pass",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                    {loading ? (
                      <Loader />
                    ) : (
                      <button
                        type="button"
                        onClick={() => _changePass("buyer")}
                        className="btn btn-info btn-round"
                      >
                        Save Password
                      </button>
                    )}
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>
                      <strong>Account</strong> Settings
                    </h2>
                  </div>
                  <Notify />
                  <div className="body">
                    <div className="row clearfix">
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={buyer.firstName}
                            onChange={(e) =>
                              _handleChange({
                                field: "firstName",
                                value: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={buyer.lastName}
                            onChange={(e) =>
                              _handleChange({
                                field: "lastName",
                                value: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={buyer.phone}
                            onChange={(e) =>
                              _handleChange({
                                field: "phone",
                                value: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={buyer.email}
                            onChange={(e) =>
                              _handleChange({
                                field: "email",
                                value: e.target.value.toUpperCase(),
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <ImageUpload
                            onUpload={(v) =>
                              _handleChange({
                                field: "image",
                                value: v,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            <button
                              onClick={() => _saveChanges("buyer")}
                              className="btn btn-primary btn-round"
                            >
                              Save Changes
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
      </div>
    </div>
  );
}
