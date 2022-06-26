import { useContext } from "react";
import { AgentsContext } from "../../../../libs/contexts/agentsContext";
import { AuthContext } from "../../../../libs/contexts/authContext";

export default function PropertyDetails() {
  const { loading } = useContext(AuthContext);
  const { agentState, _removeProp, _sold } = useContext(AgentsContext);
  const property = agentState.propertyDetails;

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
                      src={property.images.image1}
                      className="img-fluid"
                      alt="presentational images"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={property.images.image2}
                      className="img-fluid"
                      alt="presentational images"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={property.images.image3}
                      className="img-fluid"
                      alt="presentational images"
                    />
                  </div>
                  {property.images.image4 !== undefined ? (
                    <div className="carousel-item">
                      <img
                        src={property.images.image4}
                        className="img-fluid"
                        alt="presentational images"
                      />
                    </div>
                  ) : null}
                  {property.images.image5 !== undefined ? (
                    <div className="carousel-item">
                      <img
                        src={property.images.image5}
                        className="img-fluid"
                        alt="presentational images"
                      />
                    </div>
                  ) : null}
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
              <h6 className="text-success mt-3">
                GHC {property.price + " for " + property.rentOrSale}
              </h6>
              <h5 className="mt-0">
                <a href="#" className="col-blue-grey">
                  {property.name}
                </a>
              </h5>
              <p className="text-muted">{property.propDescription}</p>
              <small className="text-muted">
                <i className="fa fa-map-marker mr-2" />
                {property.digitalAddress}
              </small>
              <div className="d-flex flex-wrap justify-content-start mt-3 p-3 bg-light">
                <a href="#" className="w100" title="Square Feet">
                  <i className="fa fa-home mr-2" />
                  <span>{property.squareFt}</span>
                </a>
                <a href="#" className="w100" title="Bedrooms">
                  <i className="fa fa-bed mr-2" />
                  <span>{property.others.noOfBedrooms}</span>
                </a>
                <a href="#" className="w100" title="Parking space">
                  <i className="fa fa-car mr-2" />
                  <span>{property.carPark ? "Yes" : "No"}</span>
                </a>
                <a href="#" className="w100" title="bath rooms">
                  <i className="fa fa-shower mr-2" />
                  <span>{property.others.bathrooms}</span>
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
                      {property.amenities.swimmingPool ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Swimming pool
                    </li>
                    <li className="list-group-item">
                      {property.amenities.airCondition ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Air conditioning
                    </li>
                    <li className="list-group-item">
                      {property.others.porch ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Balcony
                    </li>
                    <li className="list-group-item">
                      {property.others.diningRoom ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Dinning Room
                    </li>
                    <li className="list-group-item">
                      {property.others.livingRoom ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Living Room
                    </li>
                  </ul>
                </div>
                <div className="col-sm-4">
                  <ul className="list-group">
                    <li className="list-group-item">
                      {property.amenities.pipeWater ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Pipe Water
                    </li>
                    <li className="list-group-item">
                      {property.amenities.electricity ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Electricity
                    </li>
                    <li className="list-group-item">
                      {property.amenities.kitchen ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Kitchen
                    </li>
                    <li className="list-group-item">
                      {property.amenities.masterBedroom ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Master bedroom
                    </li>
                    <li className="list-group-item">
                      {property.amenities.petsAllowed ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Pets Allowed
                    </li>
                  </ul>
                </div>
                <div className="col-sm-4">
                  <ul className="list-group">
                    <li className="list-group-item">
                      {property.amenities.storeRoom ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Store room
                    </li>
                    <li className="list-group-item">
                      {property.amenities.nearMainRoad ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Near main road
                    </li>
                    <li className="list-group-item">
                      {property.amenities.nearSuperMarket ? (
                        <i className="fa fa-check-circle mr-2" />
                      ) : null}
                      Near supper market
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="header">
              <h2>
                <strong>Location</strong> <small>{property.location}</small>{" "}
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
                      <th scope="row">Property Type:</th>
                      <td>{property.propType}</td>
                    </tr>
                    <tr>
                      <th scope="row">Price:</th>
                      <td>GHC{property.price}</td>
                    </tr>
                    <tr>
                      <th scope="row">Built In:</th>
                      <td>{property.yearBuilt}</td>
                    </tr>
                    <tr>
                      <th scope="row">Contract type: </th>
                      <td>
                        <span className="badge badge-primary">
                          {property.rentOrSale}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Bathrooms:</th>
                      <td>{property.others.bathrooms}</td>
                    </tr>
                    <tr>
                      <th scope="row">Square ft:</th>
                      <td>{property.squareFt}</td>
                    </tr>
                    <tr>
                      <th scope="row">Garage Space:</th>
                      <td>{property.others.carPark ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Available:</th>
                      <td>{property.others.available ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Pets:</th>
                      <td>{property.amenities.petsAllowed ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Bedrooms:</th>
                      <td>{property.others.noOfBedrooms}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="header">
              <h2>
                <strong>Actions</strong>
              </h2>
            </div>
            <div
              className="badge badge-primary ml-3"
              type="button"
              role="button"
              onClick={() => _removeProp(property._id)}
            >
              Delete property
            </div>
            <div
              className="badge badge-primary ml-3"
              type="button"
              role="button"
              onClick={() => _sold(property._id)}
            >
              Sold
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
