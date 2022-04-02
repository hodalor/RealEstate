export default function AddAgent(params) {
  return (
    <div>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card">
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
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Digital address"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Date of Birth"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ghana Card No."
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="telephone"
                        className="form-control"
                        placeholder="Guarantor 1 name"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="telephone"
                        className="form-control"
                        placeholder="Guarantor 1 contact"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <select className="form-control show-tick">
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
                        type="telephone"
                        className="form-control"
                        placeholder="Guarantor 2 name"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <input
                        type="telephone"
                        className="form-control"
                        placeholder="Guarantor 2 contact"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <select className="form-control show-tick">
                      <option value>-- Relationship 2 --</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other Family Member">
                        Other Family Member
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <select className="form-control show-tick">
                      <option value>-- Gender --</option>
                      <option value={10}>Male</option>
                      <option value={20}>Female</option>
                    </select>
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
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Confirm Password"
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
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Twitter"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Instagram"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <form
                      action="/"
                      id="frmFileUpload"
                      className="dropzone"
                      method="post"
                      encType="multipart/form-data"
                    >
                      <div className="dz-message">
                        <div className="drag-icon-cph">
                          {" "}
                          <i className="material-icons">touch_app</i>{" "}
                        </div>
                        <h3>Drop files here or click to upload.</h3>
                        <em>
                          (This is just a demo dropzone. Selected files are{" "}
                          <strong>not</strong> actually uploaded.)
                        </em>{" "}
                      </div>
                      <div className="fallback">
                        <input name="file" type="file" multiple />
                      </div>
                    </form>
                  </div>
                  <div className="col-sm-12 mt-4">
                    <button type="button" className="btn btn-primary btn-round">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-default btn-round btn-simple"
                    >
                      Cancel
                    </button>
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
