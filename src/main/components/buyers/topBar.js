import { useContext } from "react";
import { AuthContext } from "../../libs/contexts/authContext";

export default function TopBar() {
  const { _logout } = useContext(AuthContext);

  return (
    <div>
      {/* Overlay For Sidebars */}
      <div className="overlay" />
      {/* Top Bar */}
      <nav className="navbar p-l-5 p-r-5">
        <ul className="nav navbar-nav navbar-left">
          <li>
            <div className="navbar-header">
              <a href="javascript:void(0);" className="bars" />
              <a className="navbar-brand" href="index.html">
                <img src="../assets2/images/logo.svg" width={30} alt="Oreo" />
                <span className="m-l-10">HodalorEstate</span>
              </a>
            </div>
          </li>
          <li>
            <a
              href="javascript:void(0);"
              className="ls-toggle-btn"
              data-close="true"
            >
              <i className="fa fa-bars" />
            </a>
          </li>
          {/* <li className="hidden-md-down">
            <a href="" title="favorites">
              <i className="fa fa-heart" />
            </a>
          </li>
          <li>
            <a href="" title="Contact Support">
              <i className="fa fa-phone" />
            </a>
          </li> */}
          <li className="float-right">
            <span
              type="button"
              role="button"
              className="mega-menu"
              data-close="true"
              title="log out"
              onClick={_logout}
            >
              <i className="fa fa-power-off" />
            </span>
            <a
              href="javascript:void(0);"
              className="js-right-sidebar"
              data-close="true"
            >
              <i className="fa fa-cog zmdi-hc-spin" />
            </a>
          </li>
        </ul>
      </nav>
      {/* Right Sidebar */}
      <aside id="rightsidebar" className="right-sidebar">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#setting">
              <i className="fa fa-cog zmdi-hc-spin" />
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#chat">
              <i className="fa fa-heart" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#activity">
              Support
            </a>
          </li> */}
        </ul>
        <div className="tab-content">
          <div className="tab-pane slideRight active" id="setting">
            <div className="slim_scroll">
              <div className="card">
                <h6>Skins</h6>
                <ul className="choose-skin list-unstyled">
                  <li data-theme="purple" className="active">
                    <div className="purple" />
                  </li>
                  <li data-theme="blue">
                    <div className="blue" />
                  </li>
                  <li data-theme="cyan">
                    <div className="cyan" />
                  </li>
                  <li data-theme="green">
                    <div className="green" />
                  </li>
                  <li data-theme="orange">
                    <div className="orange" />
                  </li>
                  <li data-theme="blush">
                    <div className="blush" />
                  </li>
                </ul>
              </div>
              <div className="card theme-light-dark">
                <h6>Left Menu</h6>
                <button className="t-light btn btn-default btn-simple btn-round btn-block">
                  Light
                </button>
                <button className="t-dark btn btn-default btn-round btn-block">
                  Dark
                </button>
              </div>
            </div>
          </div>
          <div className="tab-pane right_chat stretchLeft" id="chat">
            <div className="slim_scroll">
              <div className="card">
                <h5>Liked Properties</h5>
              </div>
              <div className="card">
                <ul className="list-unstyled">
                  <li className="online">
                    <a href="javascript:void(0);">
                      <div className="media">
                        <img
                          className="media-object "
                          src="../assets2/images/xs/avatar4.jpg"
                          alt
                        />
                        <div className="media-body">
                          <span className="name">Sophia</span>
                          <span className="message">
                            There are many variations of passages of Lorem Ipsum
                            available
                          </span>
                          <span className="badge badge-outline status" />
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-pane slideLeft" id="activity">
            <div className="slim_scroll">
              <div className="card user_activity">
                <h6>Contact Support</h6>
                <div className="streamline b-accent">
                  <div className="sl-item">
                    <div className="sl-content">
                      <h5 className="m-b-0">Contacts</h5>
                      <small>
                        <strong>P:</strong> +264-625-2323
                      </small>
                      <small>
                        <strong>E:</strong> support@gmail.com
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
