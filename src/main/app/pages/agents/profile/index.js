import { useContext } from "react";
import { AuthContext } from "../../../../libs/contexts/authContext";
import Loader from "../../../../components/loader";
import Notify from "../../../../components/notification";
import ImageUpload from "../../../../components/uploadImage";
import { AgentsContext } from "../../../../libs/contexts/agentsContext";

export default function AgentProfile() {
  const { _handleChange, agentState, _changePass, _saveChanges } =
    useContext(AgentsContext);
  const { loading } = useContext(AuthContext);
  const agent = agentState.agent;

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
                      <img src={agent.image} alt="agent" />{" "}
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-12">
                    <h4 className="m-t-0 m-b-0">
                      <strong>{agent.firstName}</strong> {agent.lastName}
                    </h4>
                    <span className="job_post">{agent.role}</span>
                    <p>{agent.address}</p>
                    <span
                      style={{
                        color: agent.isBlocked ? "red" : "blue",
                        fontWeight: "bold",
                      }}
                    >
                      {agent.isBlocked ? "BLOCKED" : "ACTIVE"}
                    </span>
                    <p className="social-icon m-t-5 m-b-0">
                      {agent.twAct === "" ? (
                        <span></span>
                      ) : (
                        <a title="Twitter" href={agent.twAct}>
                          <i className="fab fa-twitter" />
                        </a>
                      )}
                      {agent.fbAct === "" ? (
                        <span></span>
                      ) : (
                        <a title="Facebook" href={agent.fbAct}>
                          <i className="fab fa-facebook" />
                        </a>
                      )}
                      {agent.insAct === "" ? (
                        <span></span>
                      ) : (
                        <a title="Instagram" href={agent.insAct}>
                          <i className="fab fa-instagram " />
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-5 col-md-12">
            <div className="card">
              <ul className="row profile_state list-unstyled">
                <li className="col-lg-3 col-md-3 col-6">
                  <div className="body">
                    <i className="fa fa-city col-amber" />
                    <h5
                      className="m-b-0 number count-to"
                      data-from={0}
                      data-to={2365}
                      data-speed={1000}
                      data-fresh-interval={700}
                    >
                      {agent.properties.length}
                    </h5>
                    <small>Properties</small>
                  </div>
                </li>
                <li className="col-lg-3 col-md-3 col-6">
                  <div className="body">
                    <i className="fa fa-credit-card col-blue" />
                    <h5
                      className="m-b-0 number count-to"
                      data-from={0}
                      data-to={1203}
                      data-speed={1000}
                      data-fresh-interval={700}
                    >
                      {agent.deals}
                    </h5>
                    <small>Closed deals</small>
                  </div>
                </li>
                <li className="col-lg-3 col-md-3 col-6">
                  <div className="body">
                    <i className="fa fa-user-plus col-red" />
                    <h5
                      className="m-b-0 number count-to"
                      data-from={0}
                      data-to={324}
                      data-speed={1000}
                      data-fresh-interval={700}
                    >
                      {agent.days}
                    </h5>
                    <small>day(s) membership</small>
                  </div>
                </li>
                <li className="col-lg-3 col-md-3 col-6">
                  <div className="body">
                    <img src={agent.qr} alt="qr" />
                  </div>
                </li>
              </ul>
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
                  <p>{agent.email}</p>
                  <hr />
                  <small className="text-muted">Phone: </small>
                  <p>{agent.phone}</p>
                  <hr />
                  <small className="text-muted">Birth Date: </small>
                  <p className="m-b-0">{agent.dob}</p>
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
                        onClick={() => _changePass("agent")}
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
                            placeholder={agent.firstName}
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
                            placeholder={agent.lastName}
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
                            placeholder={agent.phone}
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
                            placeholder={agent.email}
                            onChange={(e) =>
                              _handleChange({
                                field: "email",
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
                            placeholder={agent.address}
                            onChange={(e) =>
                              _handleChange({
                                field: "address",
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
                            placeholder={
                              agent.fbAct === "" ? "Fb account" : agent.fbAct
                            }
                            onChange={(e) =>
                              _handleChange({
                                field: "fb",
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
                            placeholder={
                              agent.twAct === "" ? "Tw account" : agent.twAct
                            }
                            onChange={(e) =>
                              _handleChange({
                                field: "tw",
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
                            placeholder={
                              agent.insAct === "" ? "Ins account" : agent.insAct
                            }
                            onChange={(e) =>
                              _handleChange({
                                field: "ins",
                                value: e.target.value,
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
                              onClick={() => _saveChanges("agent")}
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
