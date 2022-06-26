import { useContext } from "react";
import { AuthContext } from "../../libs/contexts/authContext";
import { AdminContext } from "../../libs/contexts/adminContext";

export default function AdminTopBar() {
  const { _logout } = useContext(AuthContext);
  const { adminData } = useContext(AdminContext);
  const pending = adminData.pending;

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
              // href="javascript:void(0);"
              className="dropdown-toggle"
              // data-toggle="dropdown"
              // role="pointer"
            >
              <i className="fa fa-bell" title="notifications" />
              {pending.length === 0 ? (
                <div className="notify">
                  <span className="" />
                  <span className="" />
                </div>
              ) : (
                <div className="notify">
                  <span className="heartbit" />
                  <span className="point" />
                </div>
              )}
            </a>
          </li>

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
