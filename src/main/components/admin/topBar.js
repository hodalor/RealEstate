import { Link } from "react-router-dom";

export default function AdminTopBar() {
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
          <li className="dropdown">
            {" "}
            <a
              href="javascript:void(0);"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
            >
              <i className="fa fa-bell" title="notifications" />
              <div className="notify">
                <span className="heartbit" />
                <span className="point" />
              </div>
            </a>
            <ul className="dropdown-menu pullDown">
              <li className="body">
                <ul className="menu list-unstyled">
                  <li>
                    <a href="javascript:void(0);">
                      <div className="media">
                        <img
                          className="media-object w60"
                          src="../assets/images/image-gallery/1.jpg"
                          alt
                        />
                        <div className="media-body">
                          <span className="name">
                            Sophia <span className="time">For Sale</span>
                          </span>
                          <span className="message">Relaxing Apartment</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <div className="media">
                        <img
                          className="media-object w60"
                          src="../assets/images/image-gallery/2.jpg"
                          alt
                        />
                        <div className="media-body">
                          <span className="name">
                            Sophia <span className="time">For Rent</span>
                          </span>
                          <span className="message">
                            Co-op Apartment in Bay Terrace
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <div className="media">
                        <img
                          className="media-object w60"
                          src="../assets/images/image-gallery/3.jpg"
                          alt
                        />
                        <div className="media-body">
                          <span className="name">
                            Isabella <span className="time">For Rent</span>
                          </span>
                          <span className="message">
                            A must see Villa on Chicago Ave
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <div className="media">
                        <img
                          className="media-object w60"
                          src="../assets/images/image-gallery/4.jpg"
                          alt
                        />
                        <div className="media-body">
                          <span className="name">
                            Alexander <span className="time">For Sale</span>
                          </span>
                          <span className="message">
                            5 Room Apartment Special Deal
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <div className="media">
                        <img
                          className="media-object w60"
                          src="../assets/images/image-gallery/5.jpg"
                          alt
                        />
                        <div className="media-body">
                          <span className="name">
                            Grayson <span className="time">For Rent</span>
                          </span>
                          <span className="message">
                            Real House Luxury Villa
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer">
                {" "}
                <a href="javascript:void(0);">View All</a>{" "}
              </li>
            </ul>
          </li>

          <li className="float-right">
            <Link
              to="/login"
              type="button"
              role="button"
              className="mega-menu"
              data-close="true"
              title="log out"
            >
              <i className="fa fa-power-off" />
            </Link>
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
        </div>
      </aside>
    </div>
  );
}
