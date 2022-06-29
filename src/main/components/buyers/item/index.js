import { useContext } from "react";
import { BuyersContext } from "../../../libs/contexts/buyersContext";

export default function ItemComp() {
  const { buyerState, _navigateToDetails } = useContext(BuyersContext);
  const properties = buyerState.properties;

  return (
    <div className="row clearfix">
      {properties !== undefined || properties.length !== 0 ? (
        properties.map((property, index) => {
          return (
            <div className="col-lg-4 col-md-12" key={index}>
              <div className="card">
                <div className="body">
                  <img
                    className="img-thumbnail img-fluid"
                    src={property.images.image1}
                    alt="item-view"
                    type="button"
                    role="button"
                    onClick={() => _navigateToDetails(property)}
                  />
                  <h6 className="text-success mt-3">{property.price}</h6>
                  <h5 className="mt-0">
                    <span className="col-blue-grey">{property.name}</span>
                  </h5>
                  <p className="text-muted">{property.description}</p>
                  <small className="text-muted">
                    <i className="fa fa-map-marker-alt mr-2" />
                    {property.digitalAddress}
                  </small>
                  <div className="d-flex justify-content-between mt-3 p-3 bg-light">
                    <a href="#" title="Square Feet">
                      <i className="fa fa-home mr-2" />
                      <span>{property.sqFt}</span>
                    </a>
                    <a href="#" title="Bedroom">
                      <i className="fa fa-hotel mr-2" />
                      <span>{property.others.noOfBedrooms}</span>
                    </a>
                    <a href="#" title="Parking space">
                      <i className="fa fa-car mr-2" />
                      <span>{property.others.carPark ? "Yes" : "No"}</span>
                    </a>
                    <a href="#" title="bath rooms">
                      <i className="fa fa-shower mr-2" />
                      <span>{property.others.bathrooms}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <span>No data found</span>
      )}
    </div>
  );
}
