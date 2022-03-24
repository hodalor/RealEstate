export default function AgentDetails() {
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
                    againt@gmail.com
                      <br /> +233 000000
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
      </div>
    </div>
  );
}
