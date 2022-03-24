import { useContext } from "react";
import { BuyersContext } from "../../../../libs/contexts/buyersContext";

export default function Favorites() {
  const { _navigateToDetails } = useContext(BuyersContext);
  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-4 col-md-12">
          <div className="card">
            <div className="body">
              <img
                className="img-thumbnail img-fluid"
                src="../assets2/images/image-gallery/1.jpg"
                alt="item-view"
                type="button"
                role="button"
                onClick={() => _navigateToDetails("1")}
              />
              <h6 className="text-success mt-3">$390,000 - $430,000</h6>
              <h5 className="mt-0">
                <span className="col-blue-grey">
                  4BHK Alexander Court,New York
                </span>
              </h5>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit Aliquam
                gravida magna et fringilla convallis. Pellentesque habitant morb
              </p>
              <small className="text-muted">
                <i className="fa fa-map-marker-alt mr-2" />
                245 E 20th St, New York, NY 201609
              </small>
              <div className="d-flex justify-content-between mt-3 p-3 bg-light">
                <a href="#" title="Square Feet">
                  <i className="fa fa-home mr-2" />
                  <span>280</span>
                </a>
                <a href="#" title="Bedroom">
                  <i className="fa fa-hotel mr-2" />
                  <span>4</span>
                </a>
                <a href="#" title="Parking space">
                  <i className="fa fa-car mr-2" />
                  <span>2</span>
                </a>
                <a href="#" title="bath rooms">
                  <i className="fa fa-shower mr-2" />
                  <span> 2</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
