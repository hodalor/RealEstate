import { useContext } from "react";
import { BuyersContext } from "../../../../libs/contexts/buyersContext";

export default function AgentDetails() {
  const { buyerState } = useContext(BuyersContext);
  const agent = buyerState.agent;

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
                    <p>
                      {agent.email}
                      <br /> {agent.phone}
                    </p>
                    <p className="social-icon m-t-5 m-b-0">
                      {agent.twAct === "" ? (
                        <span></span>
                      ) : (
                        <a title="Twitter" href={agent.twAct}>
                          <i className="fab fa-twitter" />
                        </a>
                      )}
                      {agent.fbAct === "" ? (
                        <span></span>
                      ) : (
                        <a title="Facebook" href={agent.fbAct}>
                          <i className="fab fa-facebook" />
                        </a>
                      )}
                      {agent.insAct === "" ? (
                        <span></span>
                      ) : (
                        <a title="Instagram" href={agent.insAct}>
                          <i className="fab fa-instagram " />
                        </a>
                      )}
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
                    <small>Member for days</small>
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
