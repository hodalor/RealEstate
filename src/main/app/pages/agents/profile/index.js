export default function AgentProfile() {
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
                      <img
                        src="../../../assets2/images/profile_av.jpg"
                        alt
                      />{" "}
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-12">
                    <h4 className="m-t-0 m-b-0">
                      <strong>Michael</strong> Deo
                    </h4>
                    <span className="job_post">Agent</span>
                    <p>
                      795 Folsom Ave, Suite 600
                      <br /> San Francisco, CADGE 94107
                    </p>
                    <p className="social-icon m-t-5 m-b-0">
                      <a title="Twitter" href="javascript:void(0);">
                        <i className="fab fa-twitter" />
                      </a>
                      <a title="Facebook" href="javascript:void(0);">
                        <i className="fab fa-facebook" />
                      </a>
                      <a title="Instagram" href="javascript:void(0);">
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
                      2365
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
                      1203
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
                      2yrs
                    </h5>
                    <small>Member for</small>
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
                  <p>michael@gmail.com</p>
                  <hr />
                  <small className="text-muted">Phone: </small>
                  <p>+ 202-555-9191</p>
                  <hr />
                  <small className="text-muted">Mobile: </small>
                  <p>+ 202-555-2828</p>
                  <hr />
                  <small className="text-muted">Birth Date: </small>
                  <p className="m-b-0">October 22th, 1990</p>
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
              <div role="tabpanel" className="tab-pane active" id="usersettings">
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
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="E-mail"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Country"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <textarea
                            rows={4}
                            className="form-control no-resize"
                            placeholder="Address Line 1"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button className="btn btn-primary btn-round">
                          Save Changes
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
