export default function PropertyDetails() {
    return (
      <div>
        <div className="row clearfix">
          <div className="col-lg-8 col-md-12">
            <div className="card">
              <div className="body">
                <div id="demo2" className="carousel slide" data-ride="carousel">
                  <ul className="carousel-indicators">
                    <li
                      data-target="#demo2"
                      data-slide-to={0}
                      className="active"
                    />
                    <li data-target="#demo2" data-slide-to={1} className />
                    <li data-target="#demo2" data-slide-to={2} className />
                  </ul>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="../../../assets2/images/image-gallery/5.jpg"
                        className="img-fluid"
                        alt
                      />
                      <div className="carousel-caption">
                        <h3>Chicago</h3>
                        <p>Thank you, Chicago!</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        src="../../../assets2/images/image-gallery/6.jpg"
                        className="img-fluid"
                        alt
                      />
                      <div className="carousel-caption">
                        <h3>New York</h3>
                        <p>We love the Big Apple!</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img
                        src="../../../assets2/images/image-gallery/12.jpg"
                        className="img-fluid"
                        alt
                      />
                      <div className="carousel-caption">
                        <h3>Los Angeles</h3>
                        <p>We had such a great time in LA!</p>
                      </div>
                    </div>
                  </div>
                  {/* Left and right controls */}
                  <a
                    className="carousel-control-prev"
                    href="#demo2"
                    data-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" />
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#demo2"
                    data-slide="next"
                  >
                    <span className="carousel-control-next-icon" />
                  </a>
                </div>
                <h6 className="text-success mt-3">$390,000 - $430,000</h6>
                <h5 className="mt-0">
                  <a href="#" className="col-blue-grey">
                    4BHK Alexander Court,New York
                  </a>
                </h5>
                <p className="text-muted">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English. Many
                  desktop publishing packages and web page editors now use Lorem
                  Ipsum as their default model text, and a search for 'lorem
                  ipsum' will uncover many web sites still in their infancy.{" "}
                </p>
                <small className="text-muted">
                  <i className="fa fa-map-marker mr-2" />
                  245 E 20th St, New York, NY 201609
                </small>
                <div className="d-flex flex-wrap justify-content-start mt-3 p-3 bg-light">
                  <a href="#" className="w100" title="Square Feet">
                    <i className="fa fa-home mr-2" />
                    <span>280</span>
                  </a>
                  <a href="#" className="w100" title="Bedroom">
                    <i className="fa fa-hotel mr-2" />
                    <span>4</span>
                  </a>
                  <a href="#" className="w100" title="Parking space">
                    <i className="fa fa-car mr-2" />
                    <span>2</span>
                  </a>
                  <a href="#" className="w100" title="bath rooms">
                    <i className="fa fa-shower mr-2" />
                    <span>2</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="header">
                <h2>
                  <strong>General</strong> Amenities
                  <small>Description Text Here...</small>
                </h2>
              </div>
              <div className="body">
                <div className="row clearfix">
                  <div className="col-sm-4">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Swimming pool
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Air conditioning
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Internet
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Radio
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Balcony
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Roof terrace
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Cable TV
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Electricity
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-4">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Terrace
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Cofee pot
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Oven
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Towelwes
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Computer
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Grill
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Parquet
                      </li>
                    </ul>
                  </div>
                  <div className="col-sm-4">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Dishwasher
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Near Green Zone
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Near Church
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Near Hospital
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Near School
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Near Shop
                      </li>
                      <li className="list-group-item">
                        <i className="fa fa-check-circle mr-2" />
                        Natural Gas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="header">
                <h2>
                  <strong>Location</strong>{" "}
                  <small>Description text here...</small>{" "}
                </h2>
              </div>
              <div className="body"></div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="card">
              <div className="header">
                <h2>
                  <strong>Details</strong>
                </h2>
              </div>
              <div className="body">
                <div className="table-responsive">
                  <table className="table table-bordered m-b-0">
                    <tbody>
                      <tr>
                        <th scope="row">Price:</th>
                        <td>$390,000</td>
                      </tr>
                      <tr>
                        <th scope="row">Contract type: </th>
                        <td>
                          <span className="badge badge-primary">For Sale</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Bathrooms:</th>
                        <td>1.5</td>
                      </tr>
                      <tr>
                        <th scope="row">Square ft:</th>
                        <td>468</td>
                      </tr>
                      <tr>
                        <th scope="row">Garage Spaces:</th>
                        <td>2</td>
                      </tr>
                      <tr>
                        <th scope="row">Land Size:</th>
                        <td>721 m²</td>
                      </tr>
                      <tr>
                        <th scope="row">Floors:</th>
                        <td>2</td>
                      </tr>
                      <tr>
                        <th scope="row">Listed for:</th>
                        <td>15 days</td>
                      </tr>
                      <tr>
                        <th scope="row">Available:</th>
                        <td>Immediately</td>
                      </tr>
                      <tr>
                        <th scope="row">Pets:</th>
                        <td>Pets Allowed</td>
                      </tr>
                      <tr>
                        <th scope="row">Bedrooms:</th>
                        <td>3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  