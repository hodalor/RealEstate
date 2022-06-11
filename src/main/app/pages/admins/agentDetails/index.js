import { useContext } from "react";
import ImageUpload from "../../../../components/uploadImage";
import { AdminContext } from "../../../../libs/contexts/adminContext";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function AgentProfile() {
  const { _handleChange, adminData } = useContext(AdminContext);
  const { loading } = useContext(AuthContext);
  const agent = adminData.agent;
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
                    <p className="social-icon m-t-5 m-b-0">
                      <a title="Twitter" href={agent.twAct}>
                        <i className="fab fa-twitter" />
                      </a>
                      <a title="Facebook" href={agent.fbAct}>
                        <i className="fab fa-facebook" />
                      </a>
                      <a title="Instagram" href={agent.insAct}>
                        <i className="fab fa-instagram " />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-5 col-md-12">
            <div className="card">
              <ul className="row profile_state list-unstyled">
                <li className="col-lg-4 col-md-4 col-6">
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
                <li className="col-lg-4 col-md-4 col-6">
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
                <li className="col-lg-4 col-md-4 col-6">
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
              </ul>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-4 col-md-12">
            <div className="card">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#about"
                  >
                    About
                  </a>
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
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#usersettings"
                  >
                    Setting
                  </a>
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
                  <div className="body">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Current Password"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                      />
                    </div>
                    <button className="btn btn-info btn-round">
                      Save Changes
                    </button>
                  </div>
                </div>
                <div className="card">
                  <div className="header">
                    <h2>
                      <strong>Account</strong> Settings
                    </h2>
                  </div>
                  <div className="body">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={agent.firstName}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={agent.lastName}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={agent.phone}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={agent.email}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={agent.address}
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
                        <button className="btn btn-primary btn-round">
                          Save Changes
                        </button>
                        <button className="btn btn-success btn-round">
                          Block Agent
                        </button>
                        <button className="btn btn-danger btn-round">
                          Delete Agent
                        </button>
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
