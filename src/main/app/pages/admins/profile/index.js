export default function AdminProfile() {
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
                    <span className="job_post">Admin</span>
                    <p>
                      795 Folsom Ave, Suite 600
                      <br /> San Francisco, CADGE 94107
                    </p>
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
