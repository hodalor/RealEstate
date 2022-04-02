export default function AddProp() {
    return (
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>Basic</strong> Information{" "}
                  <small>Property Description...</small>{" "}
                </h2>
              </div>
              <div className="body">
                <div className="row clearfix">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Property Name"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Property Location"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <select className="form-control">
                        <option className="form-control" value="">Select property type</option>
                        <option className="form-control" value="Single room">Single room</option>
                        <option className="form-control" value="Apartment">Apartment</option>
                        <option className="form-control" value="Full house">Full house</option>
                        <option className="form-control" value="Office">Office</option>
                        <option className="form-control" value="Shop">Shop</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <div className="form-line">
                        <textarea
                          rows={4}
                          className="form-control no-resize"
                          placeholder="Property Description here"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="mt-4">Property Information</h6>
                <div className="row clearfix">
                  <div className="col-sm-6">
                    <div className="radio inlineblock m-r-25">
                      <input
                        type="radio"
                        name="radio1"
                        id="radio1"
                        defaultValue="option1"
                        defaultChecked
                      />
                      <label htmlFor="radio1">For Rent</label>
                    </div>
                    <div className="radio inlineblock">
                      <input
                        type="radio"
                        name="radio1"
                        id="radio2"
                        defaultValue="option2"
                      />
                      <label htmlFor="radio2">For Sale</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Price / Rent"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Number bedrooms"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Square ft"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Car Parking(yes/no)"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <div className="form-group">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Year Built"
                      />
                      <small style={{ fontSize: "12px", marginLeft: "10px" }}>
                        Year built
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <textarea
                        rows={4}
                        className="form-control no-resize"
                        placeholder="Property digital address"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
                <h6 className="mt-4">Other rooms(yes/no)</h6>
                <div className="row">
                  <div className="col-lg-2 col-md-4 col-sm-6">
                    <div className="form-line">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Dining Room"
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-6">
                    <div className="form-line">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Kitchen"
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-6">
                    <div className="form-line">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Living Room"
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Master Bedroom"
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Bedroom 2"
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Other Room"
                      />
                    </div>
                  </div>
                </div>
                <h6 className="mt-4">General Amenities</h6>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group inlineblock">
                      <input
                        style={{ width: "20px", height: "20px", margin: "10px" }}
                        type="checkbox"
                      />
                      <label htmlFor="checkbox21">Swimming pool</label>
                    </div>
                    <div className="form-group inlineblock">
                      <input
                        style={{ width: "20px", height: "20px", margin: "10px" }}
                        type="checkbox"
                      />
                      <label htmlFor="checkbox22">Pipe Water</label>
                    </div>
                    <div className="form-group inlineblock">
                      <input
                        style={{ width: "20px", height: "20px", margin: "10px" }}
                        type="checkbox"
                      />
                      <label htmlFor="checkbox23">Air conditioning</label>
                    </div>
                    <div className="form-group inlineblock">
                      <input
                        style={{ width: "20px", height: "20px", margin: "10px" }}
                        type="checkbox"
                      />
                      <label htmlFor="checkbox24">Electricity</label>
                    </div>
                    <div className="form-group inlineblock">
                      <input
                        style={{ width: "20px", height: "20px", margin: "10px" }}
                        type="checkbox"
                      />
                      <label htmlFor="checkbox25">Porch</label>
                    </div>
                    <div className="form-group inlineblock">
                      <input
                        style={{ width: "20px", height: "20px", margin: "10px" }}
                        type="checkbox"
                      />
                      <label htmlFor="checkbox29">Near main road</label>
                    </div>
                    <div className="form-group inlineblock">
                      <input
                        style={{ width: "20px", height: "20px", margin: "10px" }}
                        type="checkbox"
                      />
                      <label htmlFor="checkbox31">Near supermarket</label>
                    </div>
                  </div>
                </div>
                <div className="row clearfix">
                  <div className="col-sm-12">
                    <form
                      action="/"
                      id="frmFileUpload"
                      className="dropzone m-b-15 m-t-15"
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
                  <div className="col-sm-12">
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
    );
  }
  